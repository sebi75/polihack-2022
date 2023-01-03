import { Request } from 'express';

export interface ResetForgotPasswordControllerRequest extends Request {
  params: {
    token: string;
  };
  email: string;

  body: {
    newPassword: string;
  };

  resetPasswordRequest: {
    expires: Date;
    id: string;
    token: string;
    email: string;
  };
}
