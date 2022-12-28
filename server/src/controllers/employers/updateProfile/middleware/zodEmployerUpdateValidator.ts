import zod from 'zod';

export const zodEmployerUpdateValidator = zod.object({
  about: zod.string().min(10).max(1000).optional(),
  profilePicture: zod.instanceof(Buffer).optional(),
});
