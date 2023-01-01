import AsyncStorage from '@react-native-async-storage/async-storage';
import { IUserModel } from '../archive/models';

export const setTokenInAsyncStorage = async (token: string): Promise<void> => {
	try {
		await AsyncStorage.setItem('token', token);
	} catch (error) {
		throw new Error('Error setting token in async storage');
	}
};

export const getTokenFromAsyncStorage = async (): Promise<string | null> => {
	try {
		const token = await AsyncStorage.getItem('token');
		return token;
	} catch (error) {
		throw new Error('Error getting token from async storage');
	}
};

export const getUserFromAsyncStorage = async (): Promise<IUserModel | null> => {
	try {
		const user: string | null = await AsyncStorage.getItem('user');
		if (user) {
			const parsedUser = JSON.parse(user);

			console.log(parsedUser, 'returning user from Async Storage');
			return parsedUser;
		}
	} catch (error) {
		console.log(error, 'returning user from Async Storage');
	}

	return null;
};

export const setUserToAsyncStorage = async (
	user: IUserModel
): Promise<void> => {
	console.log('setting new user in async storage: ', user);

	const stringifiedUser = JSON.stringify(user);

	try {
		await AsyncStorage.setItem('user', stringifiedUser);
	} catch (error) {
		console.log('setting the user in async storage');
	}
};

export const removeFromAsyncStorage = async (): Promise<void> => {
	try {
		await AsyncStorage.removeItem('user');
	} catch (error) {
		console.log('error removing user form async storage');
	}
};
