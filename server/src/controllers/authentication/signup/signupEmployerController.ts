import { Response } from 'express';
import { prisma } from '../../../lib';
import { ErrorMessagesEnum, ErrorTypesEnum, RoleTypesEnum, StatusCodesEnum } from '../../../types';
import { encryptPassword, logger } from '../../../services';
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

    logger.info(`New Employer ${user.email} created`);

    const { userId, role } = user;
    const { employerId } = employerProfile;
    const token = jwt.sign({ email, userId, role, employerId }, process.env.JWT_SECRET as string, {
      expiresIn: '24h',
    });

    return res.status(StatusCodesEnum.CREATED).json({ data: { user, employerProfile, token } });
  } catch (error) {
    logger.error(`Error creating employer ${email}: ${error}`);
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      error: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
