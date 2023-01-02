import { useMutation } from '@tanstack/react-query';
import { signupUser } from '../../../../api/signup';
import { SignupUserPayload } from '../../../../api/signup/user/models';

export const useSignupUser = () => {
	return useMutation(({ email, password }: SignupUserPayload) =>
		signupUser(email, password)
	);
};
