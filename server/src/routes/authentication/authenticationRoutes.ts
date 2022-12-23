import express from 'express';
import { singinController, signupController } from '../../controllers/authentication';

import {
  zodSignupValidator,
  isValidAgeMiddleware,
  isUserExistentMiddleware,
} from '../../controllers/authentication';

import { zodSigninValidator, isUserNonExistentMiddleware } from '../../controllers/authentication';
import { EndpointsEnum } from '../../static/endpoints';

import { genericValidationMiddleware } from '../../utils/validation';

export const authenticationRouter = express.Router();

authenticationRouter.post(
  `/${EndpointsEnum.SIGNUP}`,
  genericValidationMiddleware(zodSignupValidator),
  isUserExistentMiddleware,
  isValidAgeMiddleware,
  signupController,
);

authenticationRouter.post(
  EndpointsEnum.SIGNIN,
  genericValidationMiddleware(zodSigninValidator),
  isUserNonExistentMiddleware, // this middleware adds a level of abstraction from the main controller,
  singinController, // so that the controller doesn't have to worry about checking it
);
