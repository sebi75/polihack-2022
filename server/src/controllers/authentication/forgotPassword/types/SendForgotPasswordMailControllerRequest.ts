import { Request } from 'express';

export interface SendForgotPasswordMailControllerRequest extends Request {
  body: {
    email: string;
  };
}
