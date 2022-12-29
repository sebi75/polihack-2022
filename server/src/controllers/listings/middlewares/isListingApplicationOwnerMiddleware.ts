import { Response, NextFunction } from 'express';
import { prisma } from '../../../lib';
import { CancelUserApplicationRequest } from '../types';

import { RoleTypesEnum, ErrorTypesEnum, StatusCodesEnum } from '../../../types';
import { logger } from '../../../services';

//this middleware checks if the application exists and if
//the user is the owner of the application

export const isListingApplicationOwnerMiddleware = async (
  req: CancelUserApplicationRequest,
  res: Response,
  next: NextFunction,
) => {
  const { listingId } = req.params;
  const { userId, role } = req.tokenData;

  try {
    const application = await prisma.listingApplications.findUnique({
      where: {
        listingId_userId: {
          listingId: listingId,
          userId: userId,
        },
      },
    });

    if (!application) {
      return res.status(StatusCodesEnum.NOT_FOUND).json({
        error: ErrorTypesEnum.NOT_FOUND,
        message: 'Application not found',
      });
    }

    if (application.userId !== userId || role !== RoleTypesEnum.ADMIN) {
      return res.status(StatusCodesEnum.FORBIDDEN).json({
        error: ErrorTypesEnum.FORBIDDEN,
        message: 'You are not the owner of this application',
      });
    }

    next();
  } catch (error) {
    logger.error(`Error in isListingApplicationOwnerMiddleware: ${error}`);

    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      error: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
      message: 'Server internal error',
    });
  }
};
