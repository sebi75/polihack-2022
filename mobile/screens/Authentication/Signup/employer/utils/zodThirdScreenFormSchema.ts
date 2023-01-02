import * as z from 'zod';

export const zodThirdScreenFormSchema = z.object({
	streetNumber: z.string().min(1, {
		message: 'Please enter a valid street number.',
	}),
	streetName: z.string().min(1, {
		message: 'Please enter a valid street name.',
	}),
	city: z.string().min(1, {
		message: 'Please enter a valid city.',
	}),
	state: z.string().min(1, {
		message: 'Please enter a valid state.',
	}),
});
