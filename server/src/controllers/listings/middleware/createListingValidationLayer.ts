import zod from 'zod'

export const zodCreateListingValidator = zod.object({
    description: zod.string().min(10).max(1000),
    employerId: zod.string().min(10).max(1000),
    startDate: zod.number().min(0),
    endDate: zod.number().min(0),
    hoursPerDay: zod.number().min(0),
    jobDurationInDays: zod.number().min(0),
    jobOfferId: zod.string().min(10).max(1000),
    title: zod.string().min(10).max(1000),
})