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
  isVerifyTokenValidMiddleware,
  verifyEmailController,
} from '../../controllers/authentication/verify';

import {
  zodForgotPasswordValidator,
  sendForgotPasswordMailController,
  isResetForgotPasswordTokenValidMiddleware,
  isResetPasswordRequestValidMiddleware,
  hasAlreadyRequestedChangeMiddleware,
  resetForgotPasswordController,
} from '../../controllers/authentication/forgotPassword';

import { EndpointsEnum } from '../../types/endpoints';

import { existsUserByEmailMiddleware, genericValidationMiddleware } from '../../middlewares';
import { isAuthenticatedMiddleware } from '../../controllers/authentication';
import { StatusCodesEnum } from '../../types';
import { logger } from '../../services';

export const authenticationRouter = express.Router();

//@ts-ignore
authenticationRouter.post('/validate-token', isAuthenticatedMiddleware, (_req, res) => {
  return res.status(StatusCodesEnum.OK).json({ message: 'Authenticated' });
});

authenticationRouter.post(
  '/reset-forgot-password/:token', //@ts-ignore
  isResetForgotPasswordTokenValidMiddleware,
  isResetPasswordRequestValidMiddleware,
  resetForgotPasswordController,
);

authenticationRouter.post(
  '/forgot-password',
  genericValidationMiddleware(zodForgotPasswordValidator),
  existsUserByEmailMiddleware,
  hasAlreadyRequestedChangeMiddleware,
  sendForgotPasswordMailController,
);

authenticationRouter.post(
  '/verify/:token', //@ts-ignore
  isVerifyTokenValidMiddleware,
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
