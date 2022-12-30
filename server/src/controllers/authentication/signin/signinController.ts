import { Response } from 'express';
import { SigninControllerRequest } from './types';

import { encryptPassword, logger } from '../../../services';
import jwt from 'jsonwebtoken';
import { ErrorMessagesEnum, ErrorTypesEnum, StatusCodesEnum } from '../../../types';

export const singinController = async (req: SigninControllerRequest, res: Response) => {
  const { email, password } = req.body;

  const hashedPassword = encryptPassword(password);

  if (req.body.user.hashedPassword !== hashedPassword) {
    return res.status(StatusCodesEnum.BAD_REQUEST).json({
      error: ErrorTypesEnum.AUTH_INVALID_PASSWORD,
      message: ErrorMessagesEnum.AUTH_INVALID_PASSWORD,
    });
  }

  const { userId, role, active } = req.body.user;

  const token = jwt.sign(
    { email: email, userId, role, active: active },
    process.env.JWT_SECRET as string,
  );

  logger.info(`User ${email} logged in`);

  return res.status(StatusCodesEnum.OK).json({ data: { token, user: req.body.user } });
};
