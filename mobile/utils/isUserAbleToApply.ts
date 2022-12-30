import { IUserModel } from '../archive/models';

export const isUserAbleToApply = (userData: IUserModel) => {
	const isAbleToApply = userData.about;
};
