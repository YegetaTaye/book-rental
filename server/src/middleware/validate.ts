import { Request, Response, NextFunction } from 'express';
import joi from 'joi';
import {ApiError} from './../utils';

interface Schema {
  [key: string]: joi.Schema;
}

export const validate = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
  const keys = Object.keys(schema);
  const object: { [key: string]: any } = keys.reduce((obj, key) => {
    if (Object.prototype.hasOwnProperty.call(req, key)) {
      obj[key] = (req as any)[key];
    }
    return obj;
  }, {} as { [key: string]: any }); // Explicit index signature here

  const { value, error } = joi.compile(schema).validate(object);
  if (error) {
    const errors = error.details.map((detail) => detail.message).join(',');
    next(new ApiError(400, errors));
    // return res.json({errors})
  }

  return next();
};

