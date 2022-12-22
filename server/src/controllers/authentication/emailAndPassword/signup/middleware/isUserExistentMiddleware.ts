import { NextFunction, Response } from 'express';
import { SignupControllerRequest } from '../types';

import { prisma } from '../../../../../lib';
import { ErrorMessagesEnum, ErrorTypesEnum, StatusCodesEnum } from '../../../../../static';

export const isUserExistentMiddleware = async (
  req: SignupControllerRequest,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      return res.status(StatusCodesEnum.BAD_REQUEST).json({
        error: ErrorTypesEnum.USER_ALREADY_EXISTS,
        message: ErrorMessagesEnum.USER_ALREADY_EXISTS,
      });
    }
    next();
  } catch (error) {
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      error: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
