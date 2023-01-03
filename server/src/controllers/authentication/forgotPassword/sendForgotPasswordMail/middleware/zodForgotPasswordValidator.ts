import * as z from 'zod';

export const zodForgotPasswordValidator = z.object({
  email: z.string().email(),
});
