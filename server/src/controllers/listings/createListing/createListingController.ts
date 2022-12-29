import { Response } from 'express';

import { CreateListingRequest } from '../types';
import { prisma } from '../../../lib';

import { StatusCodesEnum, ErrorTypesEnum, ErrorMessagesEnum } from '../../../types';
import { logger } from '../../../services';

export const createListingController = async (req: CreateListingRequest, res: Response) => {
  //destructuring with what we should have in body when we get into this controller
  const { description, startDate, endDate, hoursPerDay, jobDurationInDays, title } = req.body;
  const { employerId } = req.tokenData;

  try {
    const listing = await prisma.listing.create({
      data: {
        ...req.body,
        employerId: employerId,
      },
    });

    logger.info(`New listing created: ${listing.title} by employer ${employerId}`);

    return res.status(StatusCodesEnum.CREATED).json({
      listing,
    });
  } catch (error) {
    logger.error(`Error in createListingController: ${error}`);
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      error: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
