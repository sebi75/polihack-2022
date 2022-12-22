import { Response } from 'express';
import { SigninControllerRequest } from './types';

export const singinController = async (req: SigninControllerRequest, res: Response) => {
  const { email, password } = req.body;
};
