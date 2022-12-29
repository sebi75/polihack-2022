import nodemailer from 'nodemailer';
import { logger } from '../logger';

export const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sebastianddev@gmail.com',
    pass: process.env.GOOGLE_MAIL_PASSWORD,
  },
});

const defaultMailOptions = {
  from: 'sebastianddev@gmail.com',
};

interface IMailOptions {
  to: string;
  subject: string;
  html: string;
}

export const sendMail = async (mailOptions: IMailOptions) => {
  smtpTransport.sendMail(
    {
      from: defaultMailOptions.from,
      ...mailOptions,
    },
    (error, response) => {
      if (error) {
        logger.error(`Error in sendMail: ${error}`);
      } else {
        logger.info(`Email sent: ${response.response}`);
      }
      smtpTransport.close();
    },
  );
};
