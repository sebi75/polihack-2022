import { S3Client } from '@aws-sdk/client-s3'
import * as dotenv from 'dotenv'
dotenv.config()

const REGION = process.env.AWS_S3_BUCKET_REGION
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME
const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const SECRET_KEY = process.env.AWS_SECRET_KEY

const s3Instance = new S3Client({ region: REGION, credentials: {
    accessKeyId: ACCESS_KEY_ID as string,
    secretAccessKey: SECRET_KEY as string,
},
})

export { s3Instance }
