import * as z from 'zod';

export const zodUserSignupFormSchema = z
	.object({
		email: z.string().email({
			message: 'Please enter a valid email address.',
		}),
		password: z.string().min(8, {
			message: 'Your password must be of at least 8 characters.',
		}),
		confirmPassword: z.string().min(8, {
			message: 'Your password must be of at least 8 characters.',
		}),
		birthday: z.date().min(new Date('1900-01-01')).max(new Date('2005-01-01'), {
			message: 'You must be at least 18 years old to use this app.',
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match, please check again.',
		path: ['confirmPassword'],
	});
