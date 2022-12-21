import { Response, NextFunction} from 'express'
import { ErrorTypesEnum, StatusCodesEnum } from '../../../../../static'
import { SignupControllerRequest } from '../types'
import { isValidAge } from '../utils'

export const isValidAgeMiddleware = (req: SignupControllerRequest, res: Response, next: NextFunction) => {
    const { birthday } = req.body

    if (!isValidAge(birthday)) {
        return res.status(StatusCodesEnum.BAD_REQUEST).json({
            message: "You must be 18 years old to use this service",
            status: StatusCodesEnum.BAD_REQUEST,
            error: ErrorTypesEnum.VALIDATION_ERROR
        })
    } else {
        next()
    }
}