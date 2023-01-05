import { Response } from 'express';
import { SendForgotPasswordMailControllerRequest } from '../types';

import { sendMail } from '../../../../services/mail';
import { prisma } from '../../../../lib';
import { StatusCodesEnum, ErrorMessagesEnum } from '../../../../types';
import jwt from 'jsonwebtoken';
import { logger } from '../../../../services';

export const sendForgotPasswordMailController = async (
  req: SendForgotPasswordMailControllerRequest,
  res: Response,
) => {
  const { email } = req.body;

  try {
    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: '12h',
    });

    await prisma.passwordReset.create({
      data: {
        token,
        email,
        expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
      },
    });

    await sendMail({
      html: htmlMailTemplate(token),
      subject: 'Reset your password',
      to: email,
    });
    logger.info(`Password reset email sent to ${email}`);

    return res.status(StatusCodesEnum.OK).json({
      message: 'Password reset email sent',
    });
  } catch (error) {
    logger.error(`Error sending password reset email to ${email}: ${error}`);
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};

const htmlMailTemplate = (token: string) => `
  <div>
    <h1>Forgot Password</h1>
    <p>Click the link below to reset your password</p>
    <a href="http://localhost:3000/reset-password/${token}">Reset Password</a>
    </div>
    <div> <p>Please ignore this email if you did not request a password reset</p></div>`;
