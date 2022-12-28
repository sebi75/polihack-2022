import express from 'express';

import multer from 'multer';

import { isAuthenticatedMiddleware } from '../../controllers/authentication';
import { genericValidationMiddleware, validateImageUploadMiddleware } from '../../middlewares';
import {
  zodEmployerUpdateValidator,
  updateEmployerProfileController,
} from '../../controllers/employers';

import { EndpointsEnum } from '../../types';
import { handleFileUploadMiddleware } from '../../controllers/users/updateProfile/middleware/handleFileUploadMiddleware';

export const employersRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });
employersRouter.post(
  `/${EndpointsEnum.UPDATE}`,
  upload.single('profilePicture'), //@ts-ignore
  isAuthenticatedMiddleware,
  genericValidationMiddleware(zodEmployerUpdateValidator),
  validateImageUploadMiddleware,
  handleFileUploadMiddleware,
  updateEmployerProfileController,
);
