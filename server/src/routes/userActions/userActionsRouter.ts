import express from 'express';
import { EndpointsEnum } from '../../static/endpoints';

import { isAuthenticatedMiddleware } from '../../controllers/authentication/';

import {
  updateUserController,
  zodUserUpdateValidator,
  getUserByUserIdController,
  validateUpdateUserBodyMiddleware,
} from '../../controllers/users';
import { genericValidationMiddleware } from '../../utils/';

export const userActionsRouter = express.Router();

//@ts-ignore
userActionsRouter.get('/:userId', isAuthenticatedMiddleware, getUserByUserIdController);

userActionsRouter.post(
  `/${EndpointsEnum.UPDATE}`, //@ts-ignore
  isAuthenticatedMiddleware,
  genericValidationMiddleware(zodUserUpdateValidator),
  validateUpdateUserBodyMiddleware,
  updateUserController,
);
