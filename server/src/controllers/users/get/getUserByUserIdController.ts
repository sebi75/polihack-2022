import { Response } from 'express';
import { prisma } from '../../../lib';
import { ErrorMessagesEnum, ErrorTypesEnum, StatusCodesEnum } from '../../../types';
import { RequestAfterAuthentication } from '../../../types';
import { logger } from '../../../services';

export const getUserByUserIdController = async (req: RequestAfterAuthentication, res: Response) => {
  const { userId } = req.params;
  const employerId = req.tokenData.employerId;

  try {
    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
      select: {
        UserProfile: !employerId, // if employerId is falsy, select userProfile
        EmployerProfile: !!employerId, // if employerId is truthy, select employerProfile
        createdAt: true,
        updatedAt: true,
        userId: true,
        email: true,
        isVerified: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(StatusCodesEnum.NOT_FOUND).json({
        error: ErrorTypesEnum.NOT_FOUND,
        message: ErrorMessagesEnum.USER_NOT_FOUND,
      });
    }

    return res.status(StatusCodesEnum.OK).json({
      data: { user },
    });
  } catch (error) {
    logger.error(`Error in getUserByUserIdController: ${error}`);
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      error: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
