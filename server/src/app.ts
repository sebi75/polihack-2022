import express from 'express';
import * as dotenv from 'dotenv';

import { logger } from './utils';

import bodyParser from 'body-parser';
dotenv.config();

const app: express.Application = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* ROUTES COME HERE */
import { authenticationRouter, listingsRouter, userActionsRouter } from './routes';
// import { s3Instance } from './lib';
// import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import multer from 'multer';
import { LISTINGS, AUTHENTICATION, USER_ACTIONS } from './static/endpoints';
import { ErrorMessagesEnum, ErrorTypesEnum, StatusCodesEnum } from './static';

const storage = multer.memoryStorage();
// const upload = multer({ storage });

app.use(LISTINGS, listingsRouter);
app.use(USER_ACTIONS, userActionsRouter);
app.use(AUTHENTICATION, authenticationRouter);

// app.post('/upload', upload.single('file'), (req, res) => {
//   // req.file contains the metadata of the uploaded file + buffer that is the actual file contents
//   // we need to upload the buffer data to s3 bucket and name the file in a
//   // generic way so we can store it in the database and retrieve it later
//   console.log(req.file?.buffer);
//   return res.status(200).json({ message: 'Success' });
// });

// app.get('/v1/text', async (req, res) => {
//   const command = new GetObjectCommand({
//     Bucket: process.env.AWS_S3_BUCKET_NAME,
//     Key: 'test-directory/test.txt',
//   });
//   try {
//     const response = await s3Instance.send(command);
//     const body = await response.Body?.transformToString();
//     console.log(body);
//     return res.status(200).json({ content: body });
//     // return res.status(200).json(response)
//   } catch (error) {
//     logger.error(error);
//     return res.status(500).json(error);
//   }
// });

// app.post('/v1/buckets', async (req, res) => {
//   const command = new PutObjectCommand({
//     Bucket: process.env.AWS_S3_BUCKET_NAME,
//     Key: 'test-directory/test.txt',
//     Body: 'Hello World!',
//   });

//   try {
//     const response = await s3Instance.send(command);
//     return res.status(200).json(response);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// });

// match all routes that are not defined for not found
app.use('*', (req, res) => {
  logger.info('404 Not Found');
  return res.status(StatusCodesEnum.NOT_FOUND).json({
    error: ErrorTypesEnum.NOT_FOUND,
    message: ErrorMessagesEnum.NOT_FOUND,
  });
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
