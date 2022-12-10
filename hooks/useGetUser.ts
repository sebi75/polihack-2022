import { useQuery } from "@tanstack/react-query";
import { getUserFromAsyncStorage } from "../utils";

export const useGetUser = () => {
  return useQuery(["user"], () => getUserFromAsyncStorage(), {
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
