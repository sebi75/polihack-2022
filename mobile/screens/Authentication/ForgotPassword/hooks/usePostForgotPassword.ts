import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '../../../../api/forgotPassword';

export const usePostForgotPassword = () => {
	return useMutation(({ email }: { email: string }) => forgotPassword(email));
};
