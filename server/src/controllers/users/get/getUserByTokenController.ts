import { User } from '@prisma/client';
import { Response } from 'express';
import { prisma } from '../../../lib';
import { ErrorMessagesEnum, RequestAfterAuthentication, StatusCodesEnum } from '../../../types';
import { exclude } from '../../../utils';

export const getUserByTokenController = async (req: RequestAfterAuthentication, res: Response) => {
  const { userId, employerId } = req.tokenData;

  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
      include: {
        UserProfile: !employerId,
        EmployerProfile: !!employerId,
      },
    });

    const userWithoutPassword = exclude(user as User, ['hashedPassword']);

    let profile = null;
    if (employerId) {
      profile = (userWithoutPassword as any).EmployerProfile;
    } else {
      profile = (userWithoutPassword as any).UserProfile;
    }

    return res.status(StatusCodesEnum.OK).json({
      ...userWithoutPassword,
      profile: {
        ...profile,
      },
    });
  } catch (error) {
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
