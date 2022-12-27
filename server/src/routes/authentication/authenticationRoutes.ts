import express from 'express';
import { singinController } from '../../controllers/authentication';

import {
  zodSignupUserValidator,
  zodSignupEmployerValidator,
  isValidAgeMiddleware,
  isUserExistentMiddleware,
  signupUserController,
  signupEmployerController,
} from '../../controllers/authentication';

import { zodSigninValidator, isUserNonExistentMiddleware } from '../../controllers/authentication';
import { EndpointsEnum } from '../../types/endpoints';

import { genericValidationMiddleware } from '../../utils/validation';

export const authenticationRouter = express.Router();

authenticationRouter.post(
  `/user/${EndpointsEnum.SIGNUP}`,
  genericValidationMiddleware(zodSignupUserValidator),
  isUserExistentMiddleware,
  isValidAgeMiddleware,
  signupUserController,
);
authenticationRouter.post(
  `/employer/${EndpointsEnum.SIGNUP}`,
  genericValidationMiddleware(zodSignupEmployerValidator),
  isUserExistentMiddleware,
  signupEmployerController,
);

authenticationRouter.post(
  EndpointsEnum.SIGNIN,
  genericValidationMiddleware(zodSigninValidator),
  isUserNonExistentMiddleware, // this middleware adds a level of abstraction from the main controller,
  singinController, // so that the controller doesn't have to worry about checking it
);
