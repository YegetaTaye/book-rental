import { Response } from "express";
import httpStatus from "http-status";

export const CheckValidParam = (id: string, res: Response) => {
  if (parseInt(id) <= 0 || isNaN(parseInt(id))) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: "Invalid id" });
  }
};
