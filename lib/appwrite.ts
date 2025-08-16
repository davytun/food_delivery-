import {
	Account,
	Avatars,
	Client,
	Databases,
	ID,
	Query,
	Storage,
} from "react-native-appwrite";
import {CreateUserPrams, GetMenuParams, SignInParams} from "@/type";

export const appwriteConfig = {
	endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
	projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
	platform: "com.food.delivery",
	databaseId: "689c62d80014c5654f51",
	bucketId: "689dc6a6003ace032700",
	userCollectionId: "689c6327002950b41872",
	categoriesCollectionId: "689dc0790007a1e94af2",
	menuCollectionId: "689dc171001ff0b96bfa",
	customizationsCollectionId: "689dc3b3003761efa07e",
	menuCustomizationsCollectionId: "689dc5530032cc836f02",
};

export const client = new Client();

client
	.setEndpoint(appwriteConfig.endpoint)
	.setProject(appwriteConfig.projectId)
	.setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({
	                                 email,
	                                 password,
	                                 name,
                                 }: CreateUserPrams) => {
	try {
		const newAccount = await account.create(ID.unique(), email, password, name);

		if (!newAccount) throw Error("Failed to create user");

		await signIn({email, password});

		const avatarUrl = avatars.getInitialsURL(name);

		return await databases.createDocument(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				name,
				email,
				avatar: avatarUrl,
			}
		);
	} catch (e) {
		throw new Error(e as string);
	}
};

export const signIn = async ({email, password}: SignInParams) => {
	try {
		const session = await account.createEmailPasswordSession(email, password);
	} catch (e) {
		throw new Error(e as string);
	}
};

export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();
		if (!currentAccount) throw Error("Failed to get current user");

		const currentUser = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			[Query.equal("accountId", currentAccount.$id)]
		);
		if (!currentUser) throw Error("Failed to get current user");

		return currentUser.documents[0];
	} catch (e) {
		throw new Error(e as string);
	}
};


export const getMenu = async ({category, query}: GetMenuParams) => {
	try {
		const queries: string[] = [];
		if (category) queries.push(Query.equal("categories", category));
		if (query) queries.push(Query.search("name", query));

		const menu = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.menuCollectionId,
			queries,
		)
		return menu.documents;
	} catch (e) {
		throw new Error(e as string);
	}
}

export const getCategories = async () => {
	try {
		const categories = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.categoriesCollectionId,
		)
		return categories.documents;
	} catch (e) {
		throw new Error(e as string);
	}
}