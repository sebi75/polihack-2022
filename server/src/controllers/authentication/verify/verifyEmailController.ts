import { Response } from 'express';
import { prisma } from '../../../lib';
import { ErrorMessagesEnum, ErrorTypesEnum, StatusCodesEnum } from '../../../types';
import { VerifyEmailControllerRequest } from './types';

export const verifyEmailController = async (req: VerifyEmailControllerRequest, res: Response) => {
  const userId = req.userId;
  const userVerification = req.emailVerification;

  try {
    await prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        active: true,
        isVerified: true,
      },
    });

    await prisma.emailVerification.delete({
      where: {
        id: userVerification.id,
      },
    });

    return res.status(StatusCodesEnum.OK).json({
      status: 'Success',
    });
  } catch (error) {
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      error: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
