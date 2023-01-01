import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiError } from '../types/ApiError';

export const fetcher = async <T>(
	endpoint: string,
	params: RequestInit,
	authorized: boolean
): Promise<T> => {
	const apiURL = `http://192.168.100.5:8080/api/${endpoint}`;

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

		console.log('final params: ', {
			...params,
			headers: {
				...params.headers,
				'Content-Type': 'application/json',
			},
		});

		const response = await fetch(apiURL, {
			...params,
			headers: {
				...params.headers,
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const error: ApiError = await response.json();
			throw new Error(error.message);
		}

		const data = await response.json();

		return data;
	} catch (error: any) {
		throw new Error(error);
	}
};
