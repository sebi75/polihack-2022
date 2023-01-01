import { SIGNIN } from '../../types/endpoints';
import { restService } from '../../utils';
import { SigninUserResult, SigninRequestPayload } from './models';

export const signinUser = async (email: string, password: string) => {
	return await restService.post<SigninUserResult, SigninRequestPayload>(
		SIGNIN,
		{ email, password },
		false
	);
};
