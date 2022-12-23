import { User } from '@prisma/client';
import { Request } from 'express';

type SigninBody = {
  email: string;
  password: string;

  user: User;
};

export type SigninControllerRequest = Request<{}, {}, SigninBody>;
