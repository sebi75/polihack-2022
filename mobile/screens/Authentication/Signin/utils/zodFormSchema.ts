import * as z from 'zod';

export const zodSigninFormSchema = z.object({
	email: z.string().email({
		message: 'Please enter a valid email address.',
	}),
	password: z.string().min(8, {
		message: 'Your password must be of at least 8 characters.',
	}),
});
