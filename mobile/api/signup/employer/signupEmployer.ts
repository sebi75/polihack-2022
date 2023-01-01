import { SIGNUP_EMPLOYER } from '../../../types/endpoints';
import { restService } from '../../../utils';
import { SignupEmployerPayload, SignupEmployerResult } from './models';

export const signupEmployer = async (data: SignupEmployerPayload) => {
	return await restService.post<SignupEmployerResult, SignupEmployerPayload>(
		SIGNUP_EMPLOYER,
		data,
		false
	);
};
