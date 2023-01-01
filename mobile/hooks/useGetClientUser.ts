import { useQuery } from '@tanstack/react-query';
import { getUserByToken } from '../api/user';
import { QueryKeysEnum } from '../types';

export const useGetClientUser = () => {
	return useQuery([QueryKeysEnum.CLIENT_USER], () => getUserByToken(), {
		staleTime: 1000 * 60 * 5,
		retry: false,
	});
};
