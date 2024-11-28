import { Request, Response, NextFunction } from "express";
import 'dotenv/config';
import httpStatus from "http-status";
import { ApiError } from "../utils";
import mysql from 'mysql2/promise';

const isMySQLError = (error: any): error is mysql.QueryError => {
    return typeof error.code === 'string';
  };

export const errorConverter = (err: any, req: Request, res: Response, next: NextFunction) => {
    let error = err;
    if (!(error instanceof ApiError)) {
      const statusCode =
        error.statusCode || isMySQLError(error)
          ? httpStatus.BAD_REQUEST
          : httpStatus.INTERNAL_SERVER_ERROR;
      const message = error.message || httpStatus[statusCode];
      error = new ApiError(statusCode, message, false, error.stack);
    }
    next(error);
  };

export const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {

    let { statusCode, message } = err;
    if (process.env.NODE_ENV === 'production' && !err.isOperational) {
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      // message = httpStatus[statusCode];
    }
    const response = {
      error: true,
      code: statusCode,
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    };
    res.locals.errorMessage = message;
    if (process.env.NODE_ENV === 'development') {
      console.log(err);
    }
    res.status(statusCode).send(response);
};
  