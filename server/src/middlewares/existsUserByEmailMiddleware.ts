import { Request, Response, NextFunction } from 'express';
import { prisma } from '../lib';
import { ErrorMessagesEnum, StatusCodesEnum } from '../types';

export const existsUserByEmailMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(StatusCodesEnum.NOT_FOUND).json({
        message: ErrorMessagesEnum.USER_NOT_FOUND,
      });
    }

    next();
  } catch (error) {
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
