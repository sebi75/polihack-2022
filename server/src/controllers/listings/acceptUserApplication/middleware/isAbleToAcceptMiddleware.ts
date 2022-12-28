import { Response, NextFunction } from 'express';

import { AcceptUserApplicationRequest } from '../../types';
import {
  ErrorTypesEnum,
  RoleTypesEnum,
  StatusCodesEnum,
  ListingApplicationTypeStatusEnum,
  ErrorMessagesEnum,
} from '../../../../types';

import { prisma } from '../../../../lib';

export const isAbleToAcceptMiddleware = async (
  req: AcceptUserApplicationRequest,
  res: Response,
  next: NextFunction,
) => {
  const { listingId, userId } = req.params;
  const { role, employerId } = req.tokenData;

  if (
    (role !== RoleTypesEnum.EMPLOYER && role !== RoleTypesEnum.ADMIN) ||
    !employerId ||
    !listingId
  ) {
    return res.status(StatusCodesEnum.FORBIDDEN).json({
      error: ErrorTypesEnum.FORBIDDEN,
      message: 'You are not allowed to perform this action',
    });
  }

  try {
    const application = await prisma.listingApplications.findUnique({
      where: {
        listingId_userId: {
          listingId: listingId,
          userId: userId,
        },
      },
      include: {
        Listing: true,
      },
    });

    if (!application) {
      return res.status(StatusCodesEnum.NOT_FOUND).json({
        error: ErrorTypesEnum.NOT_FOUND,
        message: 'Application not found',
      });
    }

    if (application.status !== ListingApplicationTypeStatusEnum.PENDING) {
      return res.status(StatusCodesEnum.BAD_REQUEST).json({
        error: ErrorTypesEnum.BAD_REQUEST,
        message: 'Application is not pending',
      });
    }

    if (application.Listing.employerId !== employerId) {
      return res.status(StatusCodesEnum.FORBIDDEN).json({
        error: ErrorTypesEnum.FORBIDDEN,
        message: 'You are not allowed to perform this action',
      });
    }

    next();
  } catch (error) {
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      error: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
