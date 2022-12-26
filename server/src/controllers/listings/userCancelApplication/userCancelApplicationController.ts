import { Response } from 'express';
import { CancelUserApplicationRequest } from '../types';

import {
  ListingApplicationTypeStatusEnum,
  ErrorMessagesEnum,
  ErrorTypesEnum,
  StatusCodesEnum,
} from '../../../types';
import { prisma } from '../../../lib';

export const userCancelApplicationController = async (
  req: CancelUserApplicationRequest,
  res: Response,
) => {
  const { listingId } = req.params;
  const { userId } = req.tokenData;

  try {
    const application = await prisma.listingApplications.update({
      data: {
        status: ListingApplicationTypeStatusEnum.CANCELED,
      },
      where: {
        listingId_userId: {
          listingId: listingId,
          userId: userId,
        },
      },
    });

    return res.status(StatusCodesEnum.OK).json({
      data: {
        application,
      },
    });
  } catch (error) {
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      error: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
