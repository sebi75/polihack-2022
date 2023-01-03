import { Response, NextFunction } from 'express';
import { ErrorMessagesEnum, StatusCodesEnum } from '../../../../../types';
import { ResetForgotPasswordControllerRequest } from '../../types';
import jwt from 'jsonwebtoken';

export const isResetForgotPasswordTokenValidMiddleware = async (
  req: ResetForgotPasswordControllerRequest,
  res: Response,
  next: NextFunction,
) => {
  const { token } = req.params;

  if (!token) {
    return res.status(StatusCodesEnum.BAD_REQUEST).json({
      error: ErrorMessagesEnum.TOKEN_NOT_PROVIDED,
    });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    return res.status(StatusCodesEnum.BAD_REQUEST).json({
      message: ErrorMessagesEnum.INVALID_TOKEN,
    });
  }

  const tokenData = jwt.decode(token) as { email: string };

  req.email = tokenData.email;

  return next();
};
