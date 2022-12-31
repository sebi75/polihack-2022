import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiError } from '../types/ApiError';

export const fetcher = async <T>(
	endpoint: string,
	params: RequestInit,
	authorized: boolean
): Promise<T> => {
	const apiURL = `http://localhost:8080/api/${endpoint}`;

	try {
		if (authorized) {
			const token = await AsyncStorage.getItem('token');

			if (!token) {
				throw new Error('No token');
			}

			params.headers = {
				authorization: `Bearer ${token}`,
			};
		}

		const response = await fetch(apiURL, params);
		const data = await response.json();

		return data;
	} catch (error: any) {
		throw new Error(error);
	}
};
