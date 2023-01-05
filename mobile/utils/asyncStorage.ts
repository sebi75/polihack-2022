import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const removeTokenFromAsyncStorage = async (): Promise<void> => {
	try {
		await AsyncStorage.removeItem('token');
	} catch (error) {
		throw new Error('Error removing token from async storage');
	}
};
