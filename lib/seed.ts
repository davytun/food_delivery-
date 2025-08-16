import {ID} from "react-native-appwrite";
import {appwriteConfig, databases, storage} from "./appwrite";
import dummyData from "./data";

interface Category {
	name: string;
	description: string;
}

interface Customization {
	name: string;
	price: number;
	type: "topping" | "side" | "size" | "crust" | string; // extend as needed
}

interface MenuItem {
	name: string;
	description: string;
	image_url: string;
	price: number;
	rating: number;
	calories: number;
	protein: number;
	category_name: string;
	customizations: string[]; // list of customization names
}

interface DummyData {
	categories: Category[];
	customizations: Customization[];
	menu: MenuItem[];
}

// ensure dummyData has correct shape
const data = dummyData as DummyData;

async function retryWithDelay<T>(fn: () => Promise<T>, retries = 10, delay = 1000): Promise<T> {
	for (let i = 0; i < retries; i++) {
		try {
			return await fn();
		} catch (error: any) {
			console.log(`Attempt ${i + 1}/${retries} failed:`, error.message);
			if (i === retries - 1) throw error;
			
			// Longer delays for network issues
			const waitTime = delay * Math.pow(1.5, i);
			console.log(`Waiting ${waitTime}ms before retry...`);
			await new Promise(resolve => setTimeout(resolve, waitTime));
		}
	}
	throw new Error('Retry failed');
}

async function clearAll(collectionId: string): Promise<void> {
	const list = await databases.listDocuments(
		appwriteConfig.databaseId,
		collectionId
	);

	await Promise.all(
		list.documents.map((doc) =>
			databases.deleteDocument(appwriteConfig.databaseId, collectionId, doc.$id)
		)
	);
}

async function clearStorage(): Promise<void> {
	const list = await storage.listFiles(appwriteConfig.bucketId);

	await Promise.all(
		list.files.map((file) =>
			storage.deleteFile(appwriteConfig.bucketId, file.$id)
		)
	);
}

async function uploadImageToStorage(imageUrl: string): Promise<string> {
	try {
		const response = await fetch(imageUrl);
		if (!response.ok) return imageUrl;
		
		const blob = await response.blob();
		const fileName = `img-${Date.now()}.jpg`;

		const file = await storage.createFile(
			appwriteConfig.bucketId,
			ID.unique(),
			blob
		);

		return storage.getFileViewURL(appwriteConfig.bucketId, file.$id);
	} catch {
		return imageUrl; // fallback to original URL
	}
}

async function seed(): Promise<void> {
	try {
		console.log('🌱 Starting database seed...');
		
		// 1. Clear all with retry
		console.log('🧹 Clearing existing data...');
		await retryWithDelay(() => clearAll(appwriteConfig.categoriesCollectionId));
		await retryWithDelay(() => clearAll(appwriteConfig.customizationsCollectionId));
		await retryWithDelay(() => clearAll(appwriteConfig.menuCollectionId));
		await retryWithDelay(() => clearAll(appwriteConfig.menuCustomizationsCollectionId));
		await retryWithDelay(() => clearStorage());

		// 2. Create Categories
		console.log('📂 Creating categories...');
		const categoryMap: Record<string, string> = {};
		for (const cat of data.categories) {
			const doc = await retryWithDelay(() => databases.createDocument(
				appwriteConfig.databaseId,
				appwriteConfig.categoriesCollectionId,
				ID.unique(),
				cat
			));
			categoryMap[cat.name] = doc.$id;
			console.log(`✅ Created category: ${cat.name}`);
			await new Promise(resolve => setTimeout(resolve, 200));
		}

		// 3. Create Customizations
		console.log('🎛️ Creating customizations...');
		const customizationMap: Record<string, string> = {};
		for (const cus of data.customizations) {
			const doc = await retryWithDelay(() => databases.createDocument(
				appwriteConfig.databaseId,
				appwriteConfig.customizationsCollectionId,
				ID.unique(),
				{
					name: cus.name,
					price: cus.price,
					type: cus.type,
				}
			));
			customizationMap[cus.name] = doc.$id;
			console.log(`✅ Created customization: ${cus.name}`);
			await new Promise(resolve => setTimeout(resolve, 200));
		}

		// 4. Create Menu Items
		console.log('🍕 Creating menu items...');
		const menuMap: Record<string, string> = {};
		for (const item of data.menu) {
			console.log(`Uploading image for ${item.name}...`);
			const uploadedImage = await uploadImageToStorage(item.image_url);

			const doc = await retryWithDelay(() => databases.createDocument(
				appwriteConfig.databaseId,
				appwriteConfig.menuCollectionId,
				ID.unique(),
				{
					name: item.name,
					description: item.description,
					image_url: uploadedImage,
					price: item.price,
					rating: item.rating,
					calories: item.calories,
					protein: item.protein,
					categories: categoryMap[item.category_name],
				}
			));

			menuMap[item.name] = doc.$id;
			console.log(`✅ Created menu item: ${item.name}`);

			// 5. Create menu_customizations
			for (const cusName of item.customizations) {
				await retryWithDelay(() => databases.createDocument(
					appwriteConfig.databaseId,
					appwriteConfig.menuCustomizationsCollectionId,
					ID.unique(),
					{
						menu: doc.$id,
						customizations: customizationMap[cusName],
					}
				));
			}
			await new Promise(resolve => setTimeout(resolve, 300));
		}

		console.log("✅ Seeding complete.");
	} catch (error: any) {
		console.error('❌ Seeding failed:', error.message);
		throw error;
	}
}

export default seed;