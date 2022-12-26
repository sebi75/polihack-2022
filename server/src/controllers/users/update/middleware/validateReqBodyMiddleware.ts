import { NextFunction, Response } from 'express';
import { ErrorMessagesEnum, ErrorTypesEnum, StatusCodesEnum } from '../../../../static';
import { UpdateUserRequest } from '../types';

export enum UpdateUserPropertyKeysEnum {
  ABOUT = 'about',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  PROFILE_PICTURE = 'profilePicture',
}

export const validateUpdateUserBodyMiddleware = (
  req: UpdateUserRequest,
  res: Response,
  next: NextFunction,
) => {
  const { about, firstName, lastName, profilePicture } = req.body;

  //validate that there are not any additional fields that cannot be
  // updated in the request body and return an error if there are
  const fields = Object.keys(req.body);
  const allowedFields = [
    UpdateUserPropertyKeysEnum.ABOUT,
    UpdateUserPropertyKeysEnum.FIRST_NAME,
    UpdateUserPropertyKeysEnum.LAST_NAME,
    UpdateUserPropertyKeysEnum.PROFILE_PICTURE,
  ];

  const isValidOperation = fields.every(field =>
    allowedFields.includes(field as UpdateUserPropertyKeysEnum),
  );

  if (!isValidOperation) {
    return res.status(StatusCodesEnum.BAD_REQUEST).json({
      error: ErrorTypesEnum.VALIDATION_ERROR,
      message: 'Invalid operation',
    });
  }

  //validate that the request body has at least one field to update
  if (!about && !firstName && !lastName && !profilePicture) {
    return res.status(StatusCodesEnum.BAD_REQUEST).json({
      error: ErrorTypesEnum.VALIDATION_ERROR,
      message: ErrorMessagesEnum.UPDATE_USER_NO_FIELDS,
    });
  }

  next();
};
