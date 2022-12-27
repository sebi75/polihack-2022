import zod from 'zod';

export const zodSignupEmployerValidator = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
  name: zod.string().min(1),
  activityDomain: zod.string().min(1),
  city: zod.string().min(1),
  state: zod.string().min(1),
});
