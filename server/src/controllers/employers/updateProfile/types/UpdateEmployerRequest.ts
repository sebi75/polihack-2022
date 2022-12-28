import { EmployerUpdate } from '../../../../models/employers';
import { RequestAfterAuthentication } from '../../../../types';

//this route is protected and we first run through the authentication
// middleware where we attach the token data to the request
export interface UpdateEmployerRequest extends RequestAfterAuthentication {
  body: EmployerUpdate;
  // fileURL?: string;
  //users upload files and we have them on req.file
}
