import zod from 'zod';

export const zodSignupValidator = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
  passwordConfirmation: zod.string().min(8),
});
