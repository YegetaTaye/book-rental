import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../utils";

export const CreateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Request user --- ", req.url);
    // await createUser(req);
    res.status(httpStatus.CREATED).send({ msg: "User successfully created" });
  }
);

export const GetUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const GetUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
