import { Request, Response } from 'express'

import { prisma } from '../../lib'

import { CreateListingType } from '../../models/listings'
import { StatusCodesEnum, ErrorTypesEnum, ErrorMessagesEnum } from '../../static/'

type ICreateListingRequest = Request<{}, {}, CreateListingType>

export const createListingController = async (req: ICreateListingRequest, res: Response) => {
    const { description, employerId, startDate, endDate, hoursPerDay, jobDurationInDays, jobOfferId, title } = req.body

    try {
        const listing = await prisma.listing.create({
            data: {
                ...req.body,
            }
        })
        
        return res.status(StatusCodesEnum.CREATED).json({
            listing
        })
    } catch (error) {
        return res.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({
            error: ErrorTypesEnum.SERVER_INTERNAL_ERROR,
            message: ErrorMessagesEnum.SERVER_INTERNAL_ERROR
        })
    }
}