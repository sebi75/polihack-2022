import { Request } from 'express';
import { JwtPayload } from './JwtPayload';

//we wanted to create an abstraction type for the data we have on
//request after that it goes through the authentication middleware
//this can be further extended to define other properties
export interface RequestAfterAuthentication extends Request {
  tokenData: JwtPayload;
}

/**
 * ex:
 *
 * type CustomBodyType = {
 *   someProperty: string;
 * }
 *
 * export interface AnotherLayerOfAbstraction extends RequestAfterAuthentication {
 *  someOtherProperty: string;
 *
 *  body: CustomBodyType
 * }
 */
