import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorMessagesEnum, ErrorTypesEnum, StatusCodesEnum } from '../../../types';

import { RequestAfterAuthentication } from '../../../types'; // the info we store in the token
import { decodeJwt } from '../../../services';

export const isAuthenticatedMiddleware = (
  req: RequestAfterAuthentication,
  res: Response,
  next: NextFunction,
) => {
  //what we have is something like <api-key ${token}>
  const token = req.headers.authorization?.split(' ')[1] as string;

  if (!token) {
    return res.status(StatusCodesEnum.UNAUTHORIZED).json({
      error: ErrorTypesEnum.UNAUTHORIZED,
      message: ErrorMessagesEnum.UNAUTHORIZED,
    });
  }

  //validate the token to be valid and not altered
  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    // if the token is valid, we decode it when we need information from it
    req.tokenData = decodeJwt(token);
    next();
  } catch (error) {
    return res.status(StatusCodesEnum.UNAUTHORIZED).json({
      error: ErrorTypesEnum.UNAUTHORIZED,
      message: ErrorMessagesEnum.UNAUTHORIZED,
    });
  }
};
