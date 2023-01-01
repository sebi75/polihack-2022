import { Request } from 'express';
import { UserResultType } from '../../../../models/users';

type SigninBody = {
  email: string;
  password: string;
  hashedPassword: string;

  user: UserResultType;
};

export type SigninControllerRequest = Request<{}, {}, SigninBody>;
