import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../../../lib';
import { ErrorTypesEnum, StatusCodesEnum } from '../../../../types';

import { RequestAfterAuthentication } from '../../../../types';

export const isValidApplicationMiddleware = async (
  req: RequestAfterAuthentication,
  res: Response,
  next: NextFunction,
) => {
  const { listingId } = req.params;
  const { userId } = req.tokenData;

  if (!listingId) {
    return res.status(StatusCodesEnum.BAD_REQUEST).json({
      error: ErrorTypesEnum.LISTING_ID_NOT_PROVIDED,
      message: 'Listing ID not provided',
    });
  }

  //if we have some listingId, we need to validate that the listing actually exists
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        listingId: listingId,
      },
    });

    if (!listing) {
      return res.status(StatusCodesEnum.NOT_FOUND).json({
        error: ErrorTypesEnum.LISTING_NOT_FOUND,
        message: 'Listing not found',
      });
    }

    // if the listing exists, we need to check if the user hasn't already applied;
    const application = await prisma.listingApplications.findUnique({
      where: {
        listingId_userId: { listingId: listingId, userId: userId },
      },
    });
    if (!application) {
      next();
    }

    return res.status(StatusCodesEnum.BAD_REQUEST).json({
      error: ErrorTypesEnum.ALREADY_APPLIED,
      message: 'You have already applied to this listing',
    });
  } catch (error) {
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      error: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
      message: 'Server internal error',
    });
  }
};
