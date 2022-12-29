import { Response } from 'express';
import { SignupUserControllerRequest } from './types';
import jwt from 'jsonwebtoken';

import { encryptPassword, logger, sendMail } from '../../../services';
import { prisma } from '../../../lib';
import { ErrorMessagesEnum, ErrorTypesEnum, StatusCodesEnum } from '../../../types';

export const signupUserController = async (req: SignupUserControllerRequest, res: Response) => {
  const { birthday, email, password } = req.body;

  const hashedPassword = encryptPassword(password);

  try {
    const user = await prisma.user.create({
      data: {
        hashedPassword: hashedPassword,
        email: email,
        isVerified: false,
        role: 'USER',
      },
    });
    const userProfile = await prisma.userProfile.create({
      data: {
        userId: user.userId,
        birthday: birthday,
        firstName: '',
        lastName: '',
        profilePicture: '',
        about: '',
        location: '',
      },
    });

    logger.info(`New User ${user.email} signed up... Waiting for email verification`);
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET as string, {
      expiresIn: '24h',
    });

    await prisma.emailVerification.create({
      data: {
        userId: user.userId,
        token: token,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from the time emitted
      },
    });

    sendMail({
      to: user.email,
      subject: 'Email Verification',
      html: `<a href="http://localhost:8080/api/authentication/verify/${token}">Click here to verify your email</a>`,
    });

    return res
      .status(StatusCodesEnum.CREATED)
      .json({ data: { user, userProfile, status: 'Email verification sent' } });
  } catch (error) {
    logger.error(`Error creating user ${email}: ${error}`);
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      error: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
