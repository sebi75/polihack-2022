import { useMutation } from '@tanstack/react-query';
import { signupUser } from '../../../../../api/signup/';
import { SignupUserPayload } from '../../../../../api/signup/user/models';

export const usePostSignupUser = () => {
	return useMutation((data: SignupUserPayload) => signupUser(data));
};
