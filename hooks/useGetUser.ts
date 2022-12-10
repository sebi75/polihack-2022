import { useQuery } from "@tanstack/react-query";
import { Collections } from "../types";
import { getUserFromAsyncStorage } from "../utils";

export const useGetUser = () => {
  return useQuery([Collections.users], () => getUserFromAsyncStorage(), {
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
