import express from 'express';
import {
  createListingController,
  getListingByListingIdController,
  isAllowedToCreateListingMiddleware,
  getUserApplicationsController,
  isValidApplicationMiddleware,
  zodCreateListingValidator,
  applyToListingController,
  isListingApplicationOwnerMiddleware,
  userCancelApplicationController,
  existsEmployerByIdMiddleware,
  getEmployerListingsController,
} from '../../controllers/listings';
import { genericValidationMiddleware } from '../../utils/validation';
import { EndpointsEnum } from '../../types/endpoints';
import { isAuthenticatedMiddleware } from '../../controllers/authentication';

const listingsRouter = express.Router();

//applications

//user cancel application
listingsRouter.post(
  '/cancel/:listingId', //@ts-ignore
  isAuthenticatedMiddleware,
  isListingApplicationOwnerMiddleware,
  userCancelApplicationController,
);

//apply to listing
listingsRouter.post(
  '/apply/:listingId', //@ts-ignore
  isAuthenticatedMiddleware,
  isValidApplicationMiddleware,
  applyToListingController,
);

//get user applications
//@ts-ignore
listingsRouter.get('/user/applications', isAuthenticatedMiddleware, getUserApplicationsController);

//get employer listings
listingsRouter.get(
  '/employer/applications/:employerId', //@ts-ignore
  isAuthenticatedMiddleware,
  existsEmployerByIdMiddleware,
  getEmployerListingsController,
);

//@ts-ignore
listingsRouter.get('/:listingId', isAuthenticatedMiddleware, getListingByListingIdController);

//create listing
listingsRouter.post(
  `/${EndpointsEnum.CREATE}`, //@ts-ignore
  isAuthenticatedMiddleware,
  genericValidationMiddleware(zodCreateListingValidator),
  isAllowedToCreateListingMiddleware,
  createListingController,
);

export default listingsRouter;
