import { Response } from 'express';
import { prisma } from '../../../lib';
import { ErrorMessagesEnum, ErrorTypesEnum, RoleTypesEnum, StatusCodesEnum } from '../../../types';
import { encryptPassword, logger, sendMail } from '../../../services';
import { SignupEmployerControllerRequest } from './types';

import jwt from 'jsonwebtoken';

export const signupEmployerController = async (
  req: SignupEmployerControllerRequest,
  res: Response,
) => {
  const { activityDomain, city, email, name, password, state } = req.body;

  const hashedPassword = encryptPassword(password);
  try {
    const user = await prisma.user.create({
      data: {
        hashedPassword,
        email,
        isVerified: false,
        role: RoleTypesEnum.EMPLOYER,
      },
    });
    const employerProfile = await prisma.employerProfile.create({
      data: {
        userId: user.userId,
        name,
        activityDomain,
        city,
        state,
        about: '',
        profilePicture: '',
        location: '',
      },
    });

    logger.info(`New Employer ${user.email} created.... Waiting for email verification`);
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
      subject: `Email Verification for ${employerProfile.name}`,
      html: `<a href="http://localhost:8080/api/authentication/verify/${token}">Click here to verify your email</a>`,
    });

    return res
      .status(StatusCodesEnum.CREATED)
      .json({ data: { user, employerProfile, status: 'Email verification sent' } });
  } catch (error) {
    logger.error(`Error creating employer ${email}: ${error}`);
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      error: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
