import { Response } from 'express';
import { prisma } from '../../../lib';
import { StatusCodesEnum, ErrorTypesEnum, ErrorMessagesEnum } from '../../../types';
import { GetUserApplicationsRequest } from '../types';

export const getUserApplicationsController = async (
  req: GetUserApplicationsRequest,
  res: Response,
) => {
  const { userId } = req.tokenData;

  try {
    const applications = await prisma.listingApplications.findMany({
      where: {
        userId: userId,
      },
      include: {
        Listing: true,
      },
    });
    if (!applications) {
      return res.status(StatusCodesEnum.NOT_FOUND).json({
        error: ErrorTypesEnum.NOT_FOUND,
        message: ErrorMessagesEnum.NOT_FOUND,
      });
    }
  } catch (error) {
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      error: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
