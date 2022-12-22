import { Request } from 'express';

type SigninBody = {
  email: string;
  password: string;
};

export type SigninControllerRequest = Request<{}, {}, SigninBody>;
