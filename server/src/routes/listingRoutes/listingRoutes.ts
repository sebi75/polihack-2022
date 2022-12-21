import express from 'express'
import { createListingController, zodCreateListingValidator } from '../../controllers/listings'
import { genericValidationMiddleware } from '../../utils/validation'
import { EndpointsEnum } from '../../static/endpoints'

const listingsRouter = express.Router()

listingsRouter.post(EndpointsEnum.CREATE, genericValidationMiddleware(zodCreateListingValidator),
 createListingController)

export default listingsRouter