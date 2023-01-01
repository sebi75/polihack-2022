import { SIGNUP_USER } from '../../../types/endpoints';
import { restService } from '../../../utils';
import { SignupUserPayload, SignupUserResult } from './models';

export const signupUser = async (email: string, password: string) => {
	return await restService.post<SignupUserResult, SignupUserPayload>(
		SIGNUP_USER,
		{ email, password },
		false
	);
};
