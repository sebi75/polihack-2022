import zod from 'zod';

export const zodUserUpdateValidator = zod.object({
  about: zod.string().min(10).max(1000).optional(),
  firstName: zod.string().min(2).optional(),
  lastName: zod.string().min(2).optional(),
  profilePicture: zod.string().min(10).max(1000).optional(),
});
