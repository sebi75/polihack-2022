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
import { authenticationRouter, listingsRouter, usersRouter, employersRouter } from './routes';
import { LISTINGS, AUTHENTICATION, USERS, EMPLOYERS } from './types/endpoints';
import { ErrorMessagesEnum, ErrorTypesEnum, StatusCodesEnum } from './types';

//run function every 5 seconds
setInterval(() => {
  console.log('scheduled function that runs every 5 seconds');
}, 5000);

app.use(USERS, usersRouter);
app.use(LISTINGS, listingsRouter);
app.use(EMPLOYERS, employersRouter);
app.use(AUTHENTICATION, authenticationRouter);

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
