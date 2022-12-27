import { Response } from 'express';
import { SignupUserControllerRequest } from './types';
import jwt from 'jsonwebtoken';

import { encryptPassword, logger } from '../../../utils';
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

    logger.info(`New User ${user.email} created`);
    const token = jwt.sign(
      { email, userId: user.userId, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' },
    );

    return res.status(StatusCodesEnum.CREATED).json({ data: { user, userProfile, token } });
  } catch (error) {
    logger.error(`Error creating user ${email}: ${error}`);
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      error: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
