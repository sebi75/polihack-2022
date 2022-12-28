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
  acceptUserApplicationController,
  isAbleToAcceptMiddleware,
} from '../../controllers/listings';
import { genericValidationMiddleware } from '../../middlewares';
import { EndpointsEnum } from '../../types/endpoints';
import { isAuthenticatedMiddleware } from '../../controllers/authentication';

const listingsRouter = express.Router();

/**
 * USER / USER+EMPLOYER ENDPOINTS
 */

//user cancel application
listingsRouter.post(
  '/cancel/:listingId', //@ts-ignore
  isAuthenticatedMiddleware,
  isListingApplicationOwnerMiddleware,
  userCancelApplicationController,
);

//user apply to listing
listingsRouter.post(
  '/apply/:listingId/:listingOwnerId', //@ts-ignore
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

//get listing by id
//@ts-ignore
listingsRouter.get('/:listingId', isAuthenticatedMiddleware, getListingByListingIdController);

/**
 * EMPLOYER ENDPOINTS
 */

//create listing //todo now support image upload for listing
listingsRouter.post(
  `/${EndpointsEnum.CREATE}`, //@ts-ignore
  isAuthenticatedMiddleware,
  genericValidationMiddleware(zodCreateListingValidator),
  isAllowedToCreateListingMiddleware,
  createListingController,
);

//accept user application
listingsRouter.post(
  '/accept/:listingId/:userId', //@ts-ignore
  isAuthenticatedMiddleware,
  isAbleToAcceptMiddleware,
  acceptUserApplicationController,
);

export default listingsRouter;
