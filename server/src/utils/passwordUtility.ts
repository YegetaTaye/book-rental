
import bcrypt from 'bcrypt';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {userPayload} from '../validations'


export const generateSalt = async () => {
    return await bcrypt.genSalt()    
}


export const generatePassword = async (password: string, salt: string) => {

    return await bcrypt.hash(password, salt);

}

export const ValidatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {

    return await generatePassword(enteredPassword, salt) === savedPassword;
}


const JWT_SECRET: string = process.env.JWT_SECRET ?? '';
export const generateSignature = async (payload: userPayload) => {
    
   return jwt.sign(payload, JWT_SECRET, { expiresIn: '90d'});

};

export const validateSignature  = async(req: Request) => {

    const signature = req.get('Authorization');

    if(signature){
        try {
            const payload = await jwt.verify(signature.split(' ')[1], JWT_SECRET) as userPayload; 
            req.user = payload;
            return true;

        } catch(err){
            return false
        } 
    }
    return false
};

