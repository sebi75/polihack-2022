import { restService } from "../../services/restService";
import type { VerifyEmailResponse } from "./models/VerifyEmailResponse";
import { VERIFY, AUTHENTICATION } from "../../types/endpoints";

export const postVerifyEmail = async (token: string) => {
  return restService.post<VerifyEmailResponse, undefined>(
    `${AUTHENTICATION}/${VERIFY}/${token}`,
    undefined,
    false
  );
};
