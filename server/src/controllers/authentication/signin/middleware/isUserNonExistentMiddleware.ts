import { Response, NextFunction } from 'express';
import { SigninControllerRequest } from '../types';

import { prisma } from '../../../../lib';
import {
  ErrorMessagesEnum,
  ErrorTypesEnum,
  RoleTypesEnum,
  StatusCodesEnum,
} from '../../../../types';
import { UserResultType } from '../../../../models/users';
import { exclude } from '../../../../utils';

export const isUserNonExistentMiddleware = async (
  req: SigninControllerRequest,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(StatusCodesEnum.BAD_REQUEST).json({
        error: ErrorTypesEnum.USER_NON_EXISTENT,
        message: ErrorMessagesEnum.USER_NON_EXISTENT,
      });
    }

    req.body.hashedPassword = user.hashedPassword;

    let profile;
    if (user.role === RoleTypesEnum.EMPLOYER) {
      profile = await prisma.employerProfile.findUnique({
        where: {
          userId: user.userId,
        },
      });
    } else if (user.role === RoleTypesEnum.USER) {
      profile = await prisma.userProfile.findUnique({
        where: {
          userId: user.userId,
        },
      });
    }

    if (!user.active) {
      return res.status(StatusCodesEnum.BAD_REQUEST).json({
        error: ErrorTypesEnum.AUTH_USER_NOT_ACTIVE,
        message: ErrorMessagesEnum.AUTH_USER_NOT_ACTIVE,
      });
    }

    if (!profile) {
      return;
    }

    const userWithoutPassword = exclude(user, ['hashedPassword']);

    req.body.user = userWithoutPassword as UserResultType;
    req.body.user.profile = profile;
    next();
  } catch (error) {
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      error: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
