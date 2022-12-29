import { Request } from 'express';

export interface VerifyEmailControllerRequest extends Request {
  params: {
    token: string;
  };
  userId: string;

  emailVerification: {
    id: string;
    userId: string;
    expires: Date;
    token: string;
  };
}
