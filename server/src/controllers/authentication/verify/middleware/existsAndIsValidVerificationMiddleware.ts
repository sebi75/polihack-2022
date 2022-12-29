import { Response, NextFunction } from 'express';
import { prisma } from '../../../../lib';
import { ErrorMessagesEnum, ErrorTypesEnum, StatusCodesEnum } from '../../../../types';
import { VerifyEmailControllerRequest } from '../types';

export const existsAndIsValidVerificationMiddleware = async (
  req: VerifyEmailControllerRequest,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.userId;

  try {
    const emailVerification = await prisma.emailVerification.findUnique({
      where: {
        userId,
      },
    });

    if (!emailVerification) {
      return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
        error: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
        message: ErrorMessagesEnum.USER_VERIFICATION_NOT_FOUND,
      });
    }

    const expires = emailVerification.expires;
    const now = new Date();
    const isExpired = now.getTime() > expires.getTime();

    if (isExpired) {
      await prisma.emailVerification.delete({
        where: {
          id: emailVerification.id,
        },
      });

      return res.status(StatusCodesEnum.BAD_REQUEST).json({
        error: ErrorTypesEnum.BAD_REQUEST,
        message: ErrorMessagesEnum.VERIFICATION_TOKEN_EXPIRED,
      });
    }

    req.emailVerification = emailVerification;
    return next();
  } catch (error) {
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      error: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
