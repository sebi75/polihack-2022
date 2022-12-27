import zod from 'zod';

export const zodSignupUserValidator = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});
