import { UserProfile, UserResultType } from '../../../user/models';

export type SignupUserResult = {
	data: {
		user: UserResultType;
		status: 'Email verification sent';
	};
};
