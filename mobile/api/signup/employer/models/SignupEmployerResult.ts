import { UserResultType } from '../../../user/models';

export type SignupEmployerResult = {
	data: {
		user: UserResultType;
		status: 'Email verification sent';
	};
};
