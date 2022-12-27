import { EmployerCreate } from '../../../../models/employers';
import { Request } from 'express';

export type SignupEmployerControllerRequest = Request<{}, {}, EmployerCreate>;
