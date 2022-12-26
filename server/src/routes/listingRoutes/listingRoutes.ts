import express from 'express';
import {
  createListingController,
  getListingByListingIdController,
  isAllowedToCreateListingMiddleware,
  getUserApplicationsController,
  isValidApplicationMiddleware,
  zodCreateListingValidator,
  applyToListingController,
} from '../../controllers/listings';
import { genericValidationMiddleware } from '../../utils/validation';
import { EndpointsEnum } from '../../static/endpoints';
import { isAuthenticatedMiddleware } from '../../controllers/authentication';

const listingsRouter = express.Router();

//applications

//apply to listing
listingsRouter.post(
  '/apply/:listingId', //@ts-ignore
  isAuthenticatedMiddleware,
  isValidApplicationMiddleware,
  applyToListingController,
);
//@ts-ignore get user applications
listingsRouter.get('/applications', isAuthenticatedMiddleware, getUserApplicationsController);

//@ts-ignore
listingsRouter.get('/:listingId', isAuthenticatedMiddleware, getListingByListingIdController);

//create listing
listingsRouter.post(
  EndpointsEnum.CREATE, //@ts-ignore
  isAuthenticatedMiddleware,
  genericValidationMiddleware(zodCreateListingValidator),
  isAllowedToCreateListingMiddleware,
  createListingController,
);

export default listingsRouter;
