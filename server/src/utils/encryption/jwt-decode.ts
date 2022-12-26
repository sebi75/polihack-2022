import jwt from 'jsonwebtoken';
import { JwtPayload } from '../../types';

export const decodeJwt = (token: string): JwtPayload => {
  return jwt.decode(token) as JwtPayload;
};
