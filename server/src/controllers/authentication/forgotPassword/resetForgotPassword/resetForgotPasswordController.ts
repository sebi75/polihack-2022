import { Response } from 'express';
import { ResetForgotPasswordControllerRequest } from '../types';

import { prisma } from '../../../../lib';
import { ErrorMessagesEnum, StatusCodesEnum } from '../../../../types';
import { encryptPassword } from '../../../../services';

export const resetForgotPasswordController = async (
  req: ResetForgotPasswordControllerRequest,
  res: Response,
) => {
  const { email } = req;
  const { newPassword } = req.body;

  const hashedPassword = encryptPassword(newPassword);

  try {
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        hashedPassword: hashedPassword,
      },
    });

    await prisma.passwordReset.delete({
      where: {
        email,
      },
    });

    return res.status(StatusCodesEnum.OK).json({
      message: 'Password reset successfully',
    });
  } catch (error) {
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
