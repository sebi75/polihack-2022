import { Response } from 'express';

import { UpdateUserRequest } from './types';
import { prisma } from '../../../lib';
import { ErrorMessagesEnum, ErrorTypesEnum, StatusCodesEnum } from '../../../types';

export const updateUserController = async (req: UpdateUserRequest, res: Response) => {
  //destructuring with the fields that body CAN have, but not all of them are required
  const { about, firstName, lastName, profilePicture } = req.body;
  const { userId } = req.tokenData;

  //if the user is trying to update
  //the profile picture, we first need to upload it to aws s3

  try {
    //update the user with the new fields in req.body
    const user = await prisma.user.update({
      data: {
        ...req.body,
        profilePicture: 'https://www.google.com',
      },
      where: {
        userId,
      },
    });

    //send the newly updated user back to the client
    return res.status(StatusCodesEnum.OK).json({
      data: {
        user,
      },
    });
  } catch (error) {
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      error: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
