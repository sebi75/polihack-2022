import crypto from 'crypto';

export const encryptPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString('base64');
  const hash = crypto.createHmac('sha512', salt).update(password);

  return hash.digest('hex');
};
