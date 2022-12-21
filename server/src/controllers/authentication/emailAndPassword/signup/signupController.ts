import { Response } from 'express';
import { SignupControllerRequest } from './types'
import jwt from 'jsonwebtoken';

export const signupController = async (req: SignupControllerRequest, res: Response) => {
    const { birthday, email, password } = req.body
} 
