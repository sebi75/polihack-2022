import { UserResultType } from '../../user/models/UserResult';

export type SigninUserResult = {
	data: {
		token: string;
		user: UserResultType;
	};
};
