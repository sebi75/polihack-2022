import { UserCreate } from '../../../../models/users';
import { Request } from 'express';

export type SignupUserControllerRequest = Request<{}, {}, UserCreate>;
