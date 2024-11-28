import { Request, NextFunction, Response } from 'express'
import {userPayload} from '../validations'
import { validateSignature } from '../utils';

//add user to comming request in the middleware to chack user token
declare global {
    namespace Express{
        interface Request{
            user?: userPayload
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {

    const signature = await validateSignature(req);
    if(signature){
        return next();
    }else{
        return res.json({message: "User Not authorised"});
    }
}