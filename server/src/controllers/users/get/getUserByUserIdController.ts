import { Response } from 'express';
import { prisma } from '../../../lib';
import { ErrorMessagesEnum, ErrorTypesEnum, StatusCodesEnum } from '../../../types';
import { RequestAfterAuthentication } from '../../../types';
import { logger } from '../../../utils';

export const getUserByUserIdController = async (req: RequestAfterAuthentication, res: Response) => {
  const { userId } = req.params;

  try {
    const user = prisma.user.findUnique({
      where: {
        userId,
      },
    });

    if (!user) {
      return res.status(StatusCodesEnum.NOT_FOUND).json({
        error: ErrorTypesEnum.NOT_FOUND,
        message: ErrorMessagesEnum.NOT_FOUND,
      });
    }

    return res.status(StatusCodesEnum.OK).json({
      data: { user },
    });
  } catch (error) {
    logger.error(`Error in getUserByUserIdController: ${error}`);
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      error: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
      message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR,
    });
  }
};
