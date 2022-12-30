import { useQuery } from '@tanstack/react-query';
import { Collections } from '../types';

import { getUserApplications } from '../archive/jobs/getUserApplications';

export const useGetUserApplications = (userId: string) => {
	return useQuery(
		[Collections.jobApplications, userId],
		() => getUserApplications(userId),
		{
			staleTime: 1000 * 60 * 5, // 5 min
			keepPreviousData: true,
			retry: true,
		}
	);
};
