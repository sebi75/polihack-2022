import * as z from 'zod';

export const zodForgotPasswordFormSchema = z
	.object({
		email: z.string().email({
			message: 'Please enter a valid email address.',
		}),
		confirmEmail: z.string().email({
			message: 'Please enter a valid email address.',
		}),
	})
	.refine((data) => data.email === data.confirmEmail, {
		message: 'Emails do not match, please check again.',
		path: ['confirmEmail'],
	});
