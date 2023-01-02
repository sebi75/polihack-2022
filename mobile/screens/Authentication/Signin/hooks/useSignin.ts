import { useMutation } from '@tanstack/react-query';
import { signinUser } from '../../../../api/signin';

export const useSignin = () => {
	return useMutation(
		({ email, password }: { email: string; password: string }) =>
			signinUser(email, password)
	);
};
