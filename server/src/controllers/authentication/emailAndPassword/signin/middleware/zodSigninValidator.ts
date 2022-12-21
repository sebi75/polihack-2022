import zod from 'zod';

export const zodSigninValidator = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
});
