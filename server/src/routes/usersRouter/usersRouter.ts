import express from 'express';
import { EndpointsEnum } from '../../types/endpoints';

import { isAuthenticatedMiddleware } from '../../controllers/authentication';

import {
  updateUserController,
  zodUserUpdateValidator,
  getUserByUserIdController,
  validateUpdateUserBodyMiddleware,
} from '../../controllers/users';
import { genericValidationMiddleware } from '../../middlewares';

import { validateImageUploadMiddleware } from '../../middlewares';

import multer from 'multer';
import { handleFileUploadMiddleware } from '../../controllers/users/updateProfile/middleware/handleFileUploadMiddleware';

export const usersRouter = express.Router();

//@ts-ignore
usersRouter.get('/:userId', isAuthenticatedMiddleware, getUserByUserIdController);

//current average time for this endpoint is 500ms with very good internet
//average speed without awaiting for aws upload to finish is 250ms
//almost 2x faster ---> refactor to make it faster, but what if upload fails...?

//could make the call much faster by
//not waiting for the aws upload to finish and
//assuming it is always going to work and just returning the
//assumed url from the handleUploadFileMiddleware
const storage = multer.memoryStorage();
const upload = multer({ storage });
usersRouter.post(
  `/${EndpointsEnum.UPDATE}`,
  upload.single('profilePicture'), //@ts-ignore
  isAuthenticatedMiddleware,
  genericValidationMiddleware(zodUserUpdateValidator),
  validateImageUploadMiddleware,
  handleFileUploadMiddleware,
  validateUpdateUserBodyMiddleware,
  updateUserController,
);
