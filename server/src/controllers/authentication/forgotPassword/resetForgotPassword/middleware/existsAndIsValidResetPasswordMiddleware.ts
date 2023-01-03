import { Response, NextFunction } from 'express';
import { prisma } from '../../../../../lib';
import { ErrorMessagesEnum, StatusCodesEnum } from '../../../../../types';
import { ResetForgotPasswordControllerRequest } from '../../types';

export const isResetPasswordRequestValidMiddleware = async (
  req: ResetForgotPasswordControllerRequest,
  res: Response,
  next: NextFunction,
) => {
  const email = req.email;

  try {
    const resetPasswordRequest = await prisma.passwordReset.findUnique({
      where: {
        email,
      },
    });

    if (!resetPasswordRequest) {
      return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
        message: ErrorMessagesEnum.USER_VERIFICATION_NOT_FOUND,
      });
    }

    const expires = resetPasswordRequest.expires;
    const now = new Date();
    const isExpired = now.getTime() > expires.getTime();

    if (isExpired) {
      await prisma.emailVerification.delete({
        where: {
          id: resetPasswordRequest.id,
        },
      });

      return res.status(StatusCodesEnum.BAD_REQUEST).json({
        message: ErrorMessagesEnum.VERIFICATION_TOKEN_EXPIRED,
      });
    }

    req.resetPasswordRequest = resetPasswordRequest;
    return next();
  } catch (error) {
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
