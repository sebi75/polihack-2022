import crypto from 'crypto';

export const encryptPassword = (password: string) => {
  const hash = crypto.createHmac('sha512', process.env.SALT as string).update(password);

  return hash.digest('hex');
};
