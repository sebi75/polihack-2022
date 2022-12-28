import { Response } from 'express';
import { prisma } from '../../../lib';
import { AcceptUserApplicationRequest } from '../types';

import {
  ErrorMessagesEnum,
  ErrorTypesEnum,
  ListingApplicationTypeStatusEnum,
  StatusCodesEnum,
} from '../../../types';
import { logger } from '../../../utils';

export const acceptUserApplicationController = async (
  req: AcceptUserApplicationRequest,
  res: Response,
) => {
  const { listingId, userId } = req.params;

  try {
    const application = await prisma.listingApplications.update({
      where: {
        listingId_userId: {
          listingId: listingId,
          userId: userId,
        },
      },
      data: {
        status: ListingApplicationTypeStatusEnum.ACCEPTED,
      },
    });

    return res.status(StatusCodesEnum.OK).json({
      type: 'success',
      message: 'Application accepted',
      application,
    });
  } catch (error) {
    logger.error(`Error accepting application: ${error}`);
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      type: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
