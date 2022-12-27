const API = 'api';

export const LISTINGS = `/${API}/listings`;
export const AUTHENTICATION = `/${API}/authentication`;
export const USERS = `/${API}/users`;
export const EMPLOYERS = `/${API}/employers`;

export enum EndpointsEnum {
  CREATE = 'create',
  GET = 'get',
  SIGNUP = 'signup',
  SIGNIN = 'signin',
  UPDATE = 'update',
}
