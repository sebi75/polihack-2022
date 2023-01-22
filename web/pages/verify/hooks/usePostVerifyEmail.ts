import { useMutation } from "@tanstack/react-query";
import { postVerifyEmail } from "../../../api";

export const usePostVerifyEmail = () => {
  return useMutation((token: string) => postVerifyEmail(token));
};
