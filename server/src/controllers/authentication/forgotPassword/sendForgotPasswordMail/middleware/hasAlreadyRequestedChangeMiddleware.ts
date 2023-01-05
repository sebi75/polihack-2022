import { Response, NextFunction } from 'express';
import { prisma } from '../../../../../lib';
import { ErrorMessagesEnum, StatusCodesEnum } from '../../../../../types';
import { SendForgotPasswordMailControllerRequest } from '../../types';

export const hasAlreadyRequestedChangeMiddleware = async (
  req: SendForgotPasswordMailControllerRequest,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;

  try {
    const changeRequest = await prisma.passwordReset.findUnique({
      where: {
        email,
      },
    });

    if (changeRequest) {
      return res.status(StatusCodesEnum.BAD_REQUEST).json({
        message: 'You already requested a password change, please check your email.',
      });
    }

    next();
  } catch (error) {
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
