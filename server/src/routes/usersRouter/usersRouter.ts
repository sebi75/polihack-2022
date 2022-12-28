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

import { validateImageUploadMiddleware } from '../../middlewares';

import multer from 'multer';

export const usersRouter = express.Router();

//@ts-ignore
usersRouter.get('/:userId', isAuthenticatedMiddleware, getUserByUserIdController);

const storage = multer.memoryStorage();
const upload = multer({ storage });
usersRouter.post(
  `/${EndpointsEnum.UPDATE}`,
  upload.single('profilePicture'), //@ts-ignore
  isAuthenticatedMiddleware,
  genericValidationMiddleware(zodUserUpdateValidator),
  validateImageUploadMiddleware,
  validateUpdateUserBodyMiddleware,
  updateUserController,
);
