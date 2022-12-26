import { Request, Response } from 'express';

import { prisma } from '../../../lib';
import { ErrorTypesEnum, StatusCodesEnum } from '../../../types';

export const getListingByListingIdController = async (req: Request, res: Response) => {
  const { listingId } = req.params;

  try {
    const listing = await prisma.listing.findUnique({
      where: {
        listingId: listingId,
      },
      include: {
        Employer: true,
      },
    });

    if (!listing) {
      return res.status(StatusCodesEnum.NOT_FOUND).json({
        error: ErrorTypesEnum.NOT_FOUND,
        message: 'Listing not found',
      });
    }

    return res.status(StatusCodesEnum.OK).json({
      data: {
        listing,
      },
    });
  } catch (error) {
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      error: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
      message: 'Internal Server Error',
    });
  }
};
