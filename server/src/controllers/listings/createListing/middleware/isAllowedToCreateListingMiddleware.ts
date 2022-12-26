import { Response, NextFunction } from 'express';
import { ErrorMessagesEnum, ErrorTypesEnum, StatusCodesEnum } from '../../../../types';
import { RoleTypesEnum } from '../../../../types';
import { CreateListingRequest } from '../../types';

export const isAllowedToCreateListingMiddleware = async (
  req: CreateListingRequest,
  res: Response,
  next: NextFunction,
) => {
  const { role, employerId } = req.tokenData;

  if (!employerId || (role !== RoleTypesEnum.EMPLOYER && role !== RoleTypesEnum.ADMIN)) {
    return res.status(StatusCodesEnum.UNAUTHORIZED).json({
      error: ErrorTypesEnum.UNAUTHORIZED,
      message: ErrorMessagesEnum.UNAUTHORIZED,
    });
  }

  next();
};
