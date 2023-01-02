import { useMutation } from '@tanstack/react-query';
import { signupEmployer } from '../../../../api/signup';
import { SignupEmployerPayload } from '../../../../api/signup/employer/models';

export const useSignupEmployer = () => {
	return useMutation((data: SignupEmployerPayload) => signupEmployer(data));
};
