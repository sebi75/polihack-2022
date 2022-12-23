import zod from 'zod';

export const zodSignupValidator = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});
