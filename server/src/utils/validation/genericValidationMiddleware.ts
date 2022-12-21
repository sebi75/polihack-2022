import { AnyZodObject } from "zod"
import { Request, Response, NextFunction } from "express"

import { ErrorTypesEnum, StatusCodesEnum } from '../../static'

//example middlewares definition
// export const zodSignupValidator = zod.object({
//   email: zod.string().email("Invalid email address"),
//   password: zod.string().min(6).max(25),
//   username: zod.string().min(3).max(15),
// })

// export const zodSigninValidator = zod.object({
//   email: zod.string().email("Invalid email address"),
//   password: zod.string().min(6).max(25),
// })

export const genericValidationMiddleware =
  (zodSchema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await zodSchema.parseAsync(req.body)
      return next()
    } catch (error: any) {
      return res.status(StatusCodesEnum.BAD_REQUEST).send({
        error: ErrorTypesEnum.VALIDATION_ERROR,
        message: error,
      })
    }
  }
