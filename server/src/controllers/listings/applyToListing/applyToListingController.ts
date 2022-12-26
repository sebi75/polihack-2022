import { Response } from 'express';
import { ListingApplicationTypeStatusEnum } from '../../../types';

import { ApplyToListingRequest } from '../types';
import { prisma } from '../../../lib';
import { ErrorMessagesEnum, ErrorTypesEnum, StatusCodesEnum } from '../../../types';

const DEFAULT_STATUS = ListingApplicationTypeStatusEnum.PENDING;

export const applyToListingController = async (req: ApplyToListingRequest, res: Response) => {
  const { listingId } = req.params;
  const { userId } = req.tokenData;

  try {
    //we create the application and we include the listing that
    //the user applied to in the response
    const application = await prisma.listingApplications.create({
      data: {
        listingId: listingId,
        userId: userId,
        status: DEFAULT_STATUS,
      },
      include: {
        Listing: true,
      },
    });

    return res.status(StatusCodesEnum.CREATED).json({
      data: {
        application: application,
      },
    });
  } catch (error) {
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      error: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
