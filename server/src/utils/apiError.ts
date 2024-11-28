export class ApiError extends Error {
    public statusCode: number;
    public isOperational: boolean;

    constructor(statusCode: number, message: string, isOperational = true, stack = '') {
      super(message);
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
      this.statusCode = statusCode;
      this.isOperational = isOperational;
    }
  }