import { Response } from 'express';
import { SignupControllerRequest } from './types';
import jwt from 'jsonwebtoken';

import { encryptPassword } from '../../../../utils';
import { prisma } from '../../../../lib';

export const signupController = async (req: SignupControllerRequest, res: Response) => {
  const { birthday, email, password } = req.body;

  const hashedPassword = encryptPassword(password);

  try {
    const user = prisma.user.create;
  } catch (error) {}
};
