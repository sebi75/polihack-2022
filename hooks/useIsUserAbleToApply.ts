import { useQuery } from "@tanstack/react-query";

import { isUserAbleToApply } from "../api/user/isAbleToApply";

export const useIsUserAbleToApply = (userId: string) => {
  return useQuery(["readyToApply", userId], () => isUserAbleToApply(userId), {
    staleTime: 0, // 5 min
    keepPreviousData: false,
    retry: true,
  });
};
