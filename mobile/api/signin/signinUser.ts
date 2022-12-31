import { SIGNIN } from '../../types/endpoints';
import { restService } from '../../utils';
import { SigninUserResult } from './models';

export type SigninRequestPayload = {
	email: string;
	password: string;
};

export const signinUser = async (email: string, password: string) => {
	return await restService.post<SigninUserResult, SigninRequestPayload>(
		SIGNIN,
		{ email, password },
		false
	);
};
