import { Request, Response, NextFunction } from 'express';
import { ErrorMessagesEnum, ErrorTypesEnum, StatusCodesEnum } from '../types';

const FileSizes = {
  MAX_FILE_SIZE: 1028 * 1028 * 50, //50MB,
};

const mimetypes = /image\/png|image\/jpeg|imagesvg\+xml|image\/gif|image\/svg\+xml/;
//we apply this middleware for every update request so
//sometimes we don't have files to validate and we just want to move on
export const validateImageUploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  //we should validate that the file is an image
  //we should validate that the file is not too large
  //we should validate that the file has a valid extension
  //we should validate that the file is not empty

  //if we have a file we want to validate it
  if (!req.file) {
    return next();
  }

  const { mimetype, size } = req.file;
  //validate mimetype to be valid
  if (!mimetypes.test(mimetype)) {
    return res.status(StatusCodesEnum.BAD_REQUEST).json({
      error: ErrorTypesEnum.VALIDATION_ERROR,
      message: ErrorMessagesEnum.INVALID_FILE_TYPE,
    });
  }

  //validate file size to be valid
  if (size > FileSizes.MAX_FILE_SIZE) {
    return res.status(StatusCodesEnum.BAD_REQUEST).json({
      error: ErrorTypesEnum.VALIDATION_ERROR,
      message: ErrorMessagesEnum.FILE_SIZE_TOO_LARGE,
    });
  }

  //validate that the file is not empty
  if (size === 0) {
    return res.status(StatusCodesEnum.BAD_REQUEST).json({
      error: ErrorTypesEnum.VALIDATION_ERROR,
      message: ErrorMessagesEnum.FILE_EMPTY,
    });
  }

  return next();
};
