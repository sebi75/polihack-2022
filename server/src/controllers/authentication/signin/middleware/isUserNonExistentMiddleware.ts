import { Response, NextFunction } from 'express';
import { SigninControllerRequest } from '../types';

import { prisma } from '../../../../lib';
import { ErrorMessagesEnum, ErrorTypesEnum, StatusCodesEnum } from '../../../../types';

export const isUserNonExistentMiddleware = async (
  req: SigninControllerRequest,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(StatusCodesEnum.BAD_REQUEST).json({
        error: ErrorTypesEnum.USER_NON_EXISTENT,
        message: ErrorMessagesEnum.USER_NON_EXISTENT,
      });
    }

    if (!user.active) {
      return res.status(StatusCodesEnum.BAD_REQUEST).json({
        error: ErrorTypesEnum.AUTH_USER_NOT_ACTIVE,
        message: ErrorMessagesEnum.AUTH_USER_NOT_ACTIVE,
      });
    }

    req.body.user = user;
    next();
  } catch (error) {
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      error: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
