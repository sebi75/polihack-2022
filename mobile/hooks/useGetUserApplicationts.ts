// import { useQuery } from '@tanstack/react-query';

// export const useGetUserApplications = (userId: string) => {
// 	return useQuery(
// 		[Collections.jobApplications, userId],
// 		() => getUserApplications(userId),
// 		{
// 			staleTime: 1000 * 60 * 5, // 5 min
// 			keepPreviousData: true,
// 			retry: true,
// 		}
// 	);
// };
