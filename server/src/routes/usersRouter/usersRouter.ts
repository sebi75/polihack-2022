import express from 'express';
import { EndpointsEnum } from '../../types/endpoints';

import { isAuthenticatedMiddleware } from '../../controllers/authentication';

import {
  updateUserController,
  zodUserUpdateValidator,
  getUserByUserIdController,
  validateUpdateUserBodyMiddleware,
} from '../../controllers/users';
import { genericValidationMiddleware } from '../../utils';

export const usersRouter = express.Router();

//@ts-ignore
usersRouter.get('/:userId', isAuthenticatedMiddleware, getUserByUserIdController);

usersRouter.post(
  `/${EndpointsEnum.UPDATE}`, //@ts-ignore
  isAuthenticatedMiddleware,
  genericValidationMiddleware(zodUserUpdateValidator),
  validateUpdateUserBodyMiddleware,
  updateUserController,
);
