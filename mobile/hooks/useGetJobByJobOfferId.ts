// import { useQuery } from '@tanstack/react-query';

// export const useGetJobByJobOfferId = (jobOfferId: string) => {
// 	return useQuery(
// 		[Collections.jobOffers, jobOfferId],
// 		() => getJobByJobOfferId(jobOfferId),
// 		{
// 			staleTime: 1000 * 60 * 5, // 5 min
// 			keepPreviousData: true,
// 			retry: true,
// 		}
// 	);
// };
