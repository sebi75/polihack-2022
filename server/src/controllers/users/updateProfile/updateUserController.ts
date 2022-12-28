import { Response } from 'express';

import { UpdateUserRequest } from './types';
import { prisma } from '../../../lib';
import { ErrorMessagesEnum, ErrorTypesEnum, StatusCodesEnum } from '../../../types';

export const updateUserController = async (req: UpdateUserRequest, res: Response) => {
  //destructuring with the fields that body CAN have, but not all of them are required
  const { about, firstName, lastName, profilePicture } = req.body;
  const { userId } = req.tokenData;

  try {
    //update the user with the new fields in req.body
    const user = await prisma.userProfile.update({
      data: {
        ...req.body,
      },
      where: {
        userId,
      },
      include: {
        User: {
          select: {
            createdAt: true,
            updatedAt: true,
            userId: true,
            email: true,
            isVerified: true,
            role: true,
          },
        },
      },
    });

    //send the latest user data back to the client
    return res.status(StatusCodesEnum.OK).json({
      data: {
        user: {
          ...user.User,
          userProfile: {
            about: user.about,
            firstName: user.firstName,
            lastName: user.lastName,
            profilePicture: user.profilePicture,
            rating: user.rating,
            userId: user.userId,
            location: user.location,
            birthday: user.birthday,
          },
        },
      },
    });
  } catch (error) {
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      error: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
