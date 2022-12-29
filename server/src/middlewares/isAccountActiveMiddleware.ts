import { Response, NextFunction } from 'express';
import { ErrorMessagesEnum, ErrorTypesEnum } from '../types';
import { RequestAfterAuthentication } from '../types/RequestAfterAuthentication';

export const isAccountActiveMiddleware = (
  req: RequestAfterAuthentication,
  res: Response,
  next: NextFunction,
) => {
  if (!req.tokenData.active) {
    return res.status(401).json({
      message: ErrorMessagesEnum.ACCOUNT_NOT_ACTIVE,
      error: ErrorTypesEnum.ACCOUNT_NOT_ACTIVE,
    });
  }

  return next();
};
