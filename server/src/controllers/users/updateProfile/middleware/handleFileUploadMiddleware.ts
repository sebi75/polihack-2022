import { Response, NextFunction } from 'express';

import { ErrorMessagesEnum, ErrorTypesEnum, StatusCodesEnum } from '../../../../types';
import { uploadToS3 } from '../../../../utils';
import { UpdateUserRequest } from '../types';

import { UpdateEmployerRequest } from '../../../employers/updateProfile/types';

export const handleFileUploadMiddleware = async (
  req: UpdateUserRequest | UpdateEmployerRequest,
  res: Response,
  next: NextFunction,
) => {
  const file = req.file;

  if (!file) {
    return next();
  }

  const filePathKey = `${Date.now()}` + file.originalname;

  try {
    const fileURL = await uploadToS3(file, filePathKey);
    req.body.profilePicture = fileURL;
    next();
  } catch (error) {
    return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
      error: ErrorTypesEnum.FILE_UPLOAD_ERROR,
      message: ErrorMessagesEnum.FILE_UPLOAD_ERROR,
    });
  }
};
