import { FORGOT_PASSWORD } from '../../types/endpoints';
import { restService } from '../../utils';
import { ForgotPasswordPayload, ForgotPasswordResult } from './models';

export const forgotPassword = async (email: string) => {
	return await restService.post<ForgotPasswordResult, ForgotPasswordPayload>(
		FORGOT_PASSWORD,
		{ email },
		false
	);
};
