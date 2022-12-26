import { UserUpdate } from '../../../../models/users/User';
import { RequestAfterAuthentication } from '../../../../types';

//this route is protected and we first run through the authentication
// middleware where we attach the token data to the request
export interface UpdateUserRequest extends RequestAfterAuthentication {
  body: UserUpdate;
}
