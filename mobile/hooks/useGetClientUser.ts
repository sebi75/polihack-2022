import { useQuery } from '@tanstack/react-query';
import { getUserByToken } from '../api/user';
import { QueryKeysEnum } from '../types';

export const useGetClientUser = (enabled: boolean) => {
	return useQuery([QueryKeysEnum.CLIENT_USER], () => getUserByToken(), {
		staleTime: 1000 * 60 * 25,
		retry: false,
		enabled: enabled,
	});
};
