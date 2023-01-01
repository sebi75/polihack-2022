import express from 'express';
import {
  isUserNonExistentMiddleware,
  singinController,
  zodSigninValidator,
} from '../../controllers/authentication/signin';

import {
  isUserExistentMiddleware,
  isValidAgeMiddleware,
  signupEmployerController,
  signupUserController,
  zodSignupEmployerValidator,
  zodSignupUserValidator,
} from '../../controllers/authentication/signup';

import {
  existsAndIsValidVerificationMiddleware,
  validateTokenValidityMiddleware,
  verifyEmailController,
} from '../../controllers/authentication/verify';

import { EndpointsEnum } from '../../types/endpoints';

import { genericValidationMiddleware } from '../../middlewares';

export const authenticationRouter = express.Router();

authenticationRouter.post(
  '/verify/:token', //@ts-ignore
  validateTokenValidityMiddleware,
  existsAndIsValidVerificationMiddleware,
  verifyEmailController,
);

authenticationRouter.post(
  `/user/${EndpointsEnum.SIGNUP}`,
  genericValidationMiddleware(zodSignupUserValidator),
  isUserExistentMiddleware, //@ts-ignore
  isValidAgeMiddleware,
  signupUserController,
);
authenticationRouter.post(
  `/employer/${EndpointsEnum.SIGNUP}`,
  genericValidationMiddleware(zodSignupEmployerValidator),
  isUserExistentMiddleware, //@ts-ignore
  signupEmployerController,
);

authenticationRouter.post(
  `/${EndpointsEnum.SIGNIN}`,
  genericValidationMiddleware(zodSigninValidator),
  isUserNonExistentMiddleware, // this middleware adds a level of abstraction from the main controller,
  singinController, // so that the controller doesn't have to worry about checking it
);
