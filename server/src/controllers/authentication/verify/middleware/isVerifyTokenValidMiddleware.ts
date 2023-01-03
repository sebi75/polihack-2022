import { Response, NextFunction } from 'express';
import { ErrorMessagesEnum, ErrorTypesEnum, StatusCodesEnum } from '../../../../types';

import { VerifyEmailControllerRequest } from '../types';

import jwt from 'jsonwebtoken';

export const isVerifyTokenValidMiddleware = async (
  req: VerifyEmailControllerRequest,
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.params;

  if (!token) {
    return res.status(StatusCodesEnum.BAD_REQUEST).json({
      error: ErrorTypesEnum.BAD_REQUEST,
      message: ErrorMessagesEnum.TOKEN_NOT_PROVIDED,
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    return res.status(StatusCodesEnum.BAD_REQUEST).json({
      error: ErrorTypesEnum.BAD_REQUEST,
      message: ErrorMessagesEnum.INVALID_TOKEN,
    });
  }

  const tokenData = jwt.decode(token) as { userId: string };

  req.userId = tokenData.userId;

  return next();
};
