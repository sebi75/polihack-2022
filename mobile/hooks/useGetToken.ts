import { getTokenFromAsyncStorage } from '../utils';
import { useQuery } from '@tanstack/react-query';
import { QueryKeysEnum } from '../types';

export const useGetToken = () => {
	return useQuery([QueryKeysEnum.TOKEN], () => getTokenFromAsyncStorage(), {
		staleTime: 1000 * 60 * 5,
		retry: false,
	});
};
