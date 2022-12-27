import { AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';

import { ErrorTypesEnum, StatusCodesEnum } from '../../types';

export const genericValidationMiddleware =
  (zodSchema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await zodSchema.parseAsync(req.body);
      return next();
    } catch (error: any) {
      return res.status(StatusCodesEnum.BAD_REQUEST).send({
        error: ErrorTypesEnum.VALIDATION_ERROR,
        message: error,
      });
    }
  };
