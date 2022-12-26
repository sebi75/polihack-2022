import { Response, NextFunction } from 'express';
import { prisma } from '../../../lib';
import { ErrorMessagesEnum, ErrorTypesEnum, StatusCodesEnum } from '../../../types';

import { GetEmployerListingsRequest } from '../types';

export const existsEmployerByIdMiddleware = async (
  req: GetEmployerListingsRequest,
  res: Response,
) => {
  const { employerId } = req.params;

  try {
    const employer = await prisma.employer.findUnique({
      where: {
        employerId: employerId,
      },
    });

    if (!employer) {
      return res.status(StatusCodesEnum.NOT_FOUND).json({
        error: ErrorTypesEnum.NOT_FOUND,
        message: ErrorMessagesEnum.EMPLOYER_NOT_FOUND,
      });
    }
  } catch (error) {
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      error: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
