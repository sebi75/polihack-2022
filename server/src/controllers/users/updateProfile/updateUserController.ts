import { Response } from 'express';

import { UpdateUserRequest } from './types';
import { prisma } from '../../../lib';
import { ErrorMessagesEnum, ErrorTypesEnum, StatusCodesEnum } from '../../../types';
import { UserResultType } from '../../../models/users';
import { UserProfile } from '../../../models/users/User';
import { exclude } from '../../../utils';

export const updateUserController = async (req: UpdateUserRequest, res: Response) => {
  //destructuring with the fields that body CAN have, but not all of them are required
  const { about, firstName, lastName, profilePicture, city, county } = req.body;
  const { userId } = req.tokenData;

  try {
    const user = await prisma.userProfile.update({
      data: {
        ...req.body,
      },
      where: {
        userId,
      },
      include: {
        User: true,
      },
    });

    const userWithoutPassword = exclude(user.User, ['hashedPassword']);

    //send the latest user data back to the client
    return res.status(StatusCodesEnum.OK).json({
      data: {
        user: {
          ...userWithoutPassword,
          profile: {
            ...user,
          } as UserProfile,
        } as UserResultType,
      },
    });
  } catch (error) {
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      error: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
