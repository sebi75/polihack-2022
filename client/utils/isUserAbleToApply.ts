import { IUserModel } from "../api/models";

export const isUserAbleToApply = (userData: IUserModel) => {
  const isAbleToApply = userData.about;
};
