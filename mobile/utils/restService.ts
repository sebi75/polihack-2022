//build an abstraction service for the REST API
//that uses methods like get, post, put, delete
//and will use a custom fetcher

import { HttpMethodTypes } from '../types';
import { fetcher } from './fetcher';

export const restService = {
	get: async <T>(endpoint: string, authorized: boolean) => {
		return await fetcher<T>(
			endpoint,
			{
				method: HttpMethodTypes.GET,
			},
			authorized
		);
	},
	post: async <T, U>(endpoint: string, params: U, authorized: boolean) => {
		return await fetcher<T>(
			endpoint,
			{
				method: HttpMethodTypes.POST,
				body: JSON.stringify(params),
			},
			authorized
		);
	},
	put: async <T, U>(endpoint: string, params: U, authorized: boolean) => {
		return await fetcher<T>(
			endpoint,
			{
				method: HttpMethodTypes.PUT,
				body: JSON.stringify(params),
			},
			authorized
		);
	},
	delete: async <T, U>(endpoint: string, params: U, authorized: boolean) => {
		return await fetcher<T>(
			endpoint,
			{
				method: HttpMethodTypes.DELETE,
				body: JSON.stringify(params),
			},
			authorized
		);
	},
};
