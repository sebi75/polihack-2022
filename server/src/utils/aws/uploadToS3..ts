import { s3Instance } from '../../lib';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

import { AWS_S3_BUCKET_PATH } from '../../types';
import { logger } from '../logger';

export const uploadToS3 = async (file: Express.Multer.File, key: string) => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${process.env.AWS_S3__RESOURCES_DIRECTORY}/${key}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  try {
    const response = await s3Instance.send(command);

    logger.info(`Successfully uploaded file to S3 bucket: ${key}`);
    return `${AWS_S3_BUCKET_PATH}/${process.env.AWS_S3__RESOURCES_DIRECTORY}/${key}`;
  } catch (error) {
    logger.error(`Failed to upload file to S3 bucket: ${key}`);
    throw error;
  }
};
