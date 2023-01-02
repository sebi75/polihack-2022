import * as z from 'zod';

export const zodFirstScreenFormSchema = z.object({
	companyName: z.string().min(1, {
		message: 'Please enter a valid name.',
	}),
	activityDomain: z.string().min(1, {
		message: 'Please enter a valid activity domain.',
	}),
});
