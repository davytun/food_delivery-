import {Account, Avatars, Client, Databases, ID, Query} from 'react-native-appwrite';
import {CreateUserPrams, SignInParams} from "@/type";

export const appwriteConfig = {
	endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
	projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
	platform: "com.food.delivery",
	databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
	userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID!,
}

export const client = new Client();

client
	.setEndpoint(appwriteConfig.endpoint)
	.setProject(appwriteConfig.projectId)
	.setPlatform(appwriteConfig.platform)


export const account = new Account(client);
export const databases = new Databases(client);
const avatars = new Avatars(client);


export const createUser = async ({email, password, name}: CreateUserPrams) => {
	try {
		const newAccount = await account.create(ID.unique(), email, password, name);

		if (!newAccount) throw Error('Failed to create user');

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
		)
	} catch (e) {
		throw new Error(e as string)
	}
}

export const signIn = async ({email, password}: SignInParams) => {
	try {
		const session = await account.createEmailPasswordSession(email, password);
	} catch (e) {
		throw new Error(e as string)
	}
}

export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();
		if (!currentAccount) throw Error('Failed to get current user');

		const currentUser = await databases.listDocuments(
			appwriteConfig.databaseId,
			appwriteConfig.userCollectionId,
			[Query.equal('accountId', currentAccount.$id)]
		);
		if (!currentUser) throw Error('Failed to get current user');

		return currentUser.documents[0]
	} catch (e) {
		throw new Error(e as string)
	}
}
