import { Response } from 'express';

import { GetEmployerListingsRequest } from '../types';
import { prisma } from '../../../lib';
import { ErrorMessagesEnum, ErrorTypesEnum, StatusCodesEnum } from '../../../types';

export const getEmployerListingsController = async (
  req: GetEmployerListingsRequest,
  res: Response,
) => {
  const { employerId } = req.params;

  try {
    const applications = await prisma.listing.findMany({
      where: {
        employerId: employerId,
      },
    });

    return res.status(StatusCodesEnum.OK).json({
      data: {
        applications,
      },
    });
  } catch (error) {
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      error: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
