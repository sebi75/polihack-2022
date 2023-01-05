import { SIGNUP_USER } from '../../../types/endpoints';
import { restService } from '../../../utils';
import { SignupUserPayload, SignupUserResult } from './models';

export const signupUser = async (data: SignupUserPayload) => {
	return restService.post<SignupUserResult, SignupUserPayload>(
		SIGNUP_USER,
		data,
		false
	);
};
