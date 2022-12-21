import express from 'express'
import { signinController, signupController } from '../../controllers/authentication'
import { isValidAgeMiddleware, zodSignupValidator } from '../../controllers/authentication/emailAndPassword/signup'
import { zodSigninValidator } from '../../controllers/authentication/emailAndPassword/signin'
import { EndpointsEnum } from '../../static/endpoints'

import { genericValidationMiddleware } from '../../utils/validation'

const authenticationRoutes = express.Router()

authenticationRoutes.post(EndpointsEnum.SIGNUP, genericValidationMiddleware(zodSignupValidator), isValidAgeMiddleware, signupController)
authenticationRoutes.post(EndpointsEnum.SIGNIN, genericValidationMiddleware(zodSigninValidator), signinController)

export default authenticationRoutes