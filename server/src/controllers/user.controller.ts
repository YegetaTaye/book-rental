import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { CheckValidParam } from "../utils/checkValidParams";
import {
  catchAsync,
  generatePassword,
  generateSalt,
  generateSignature,
  ValidatePassword,
} from "../utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userSignup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, fullName, phone, idNumber, blockNumber, isAdmin } =
      req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ msg: "User already exists with this email" });

    const salt = await generateSalt();
    const hashedPassword = await generatePassword(password, salt);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        salt: salt,
        fullName: fullName,
        phone: phone,
        idNumber: idNumber,
        blockNumber: blockNumber,
        isAdmin: isAdmin,
      },
    });

    const token = await generateSignature({
      id: newUser.id,
      email: newUser.email,
      fullname: newUser.fullName,
    });

    return res.status(httpStatus.CREATED).json({
      msg: "Successfully signed up",
      token,
      id: newUser.id,
      email: newUser.email,
      fullname: newUser.fullName,
    });
  }
);

export const userLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user)
      return res.status(httpStatus.BAD_REQUEST).json({ msg: "User not found" });

    if (!(await ValidatePassword(password, user.password, user.salt)))
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Invalid Credentials" });

    const token = await generateSignature({
      id: user.id,
      email: user.email,
      fullname: user.fullName,
    });

    return res.status(httpStatus.CREATED).json({
      msg: "Successfully logged in",
      token,
      id: user.id,
      email: user.email,
      fullname: user.fullName,
    });
  }
);

export const getUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let { email } = req.query;
    email = Array.isArray(email) ? email[0] : email;

    let user;

    if (id) {
      CheckValidParam(id, res);
      user = await prisma.user.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!user)
        return res.status(httpStatus.NOT_FOUND).json({ msg: "User not found" });
    } else if (email) {
      user = await prisma.user.findUnique({
        where: {
          email: typeof email === "string" ? email : undefined,
        },
      });

      if (!user)
        return res.status(httpStatus.NOT_FOUND).json({ msg: "User not found" });
    } else {
      user = await prisma.user.findMany();
    }

    return res.status(httpStatus.OK).json(user);
  }
);

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { email, password, fullName, phone, idNumber, blockNumber, isAdmin } =
      req.body;

    CheckValidParam(id, res);

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user)
      return res.status(httpStatus.NOT_FOUND).json({ msg: "User not found" });

    let hashedPassword = user.password;
    let salt = user.salt;

    if (password) {
      salt = await generateSalt();
      hashedPassword = await generatePassword(password, salt);
    }

    await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        email: email,
        password: hashedPassword,
        salt: salt,
        fullName: fullName,
        phone: phone,
        idNumber: idNumber,
        blockNumber: blockNumber,
        isAdmin: isAdmin,
      },
    });

    const token = await generateSignature({
      id: user.id,
      email: user.email,
      fullname: user.fullName,
    });

    return res.status(httpStatus.OK).json({
      msg: "User successfully updated",
      token,
      id: user.id,
      email: user.email,
      fullname: user.fullName,
    });
  }
);

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    CheckValidParam(id, res);

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user)
      return res.status(httpStatus.NOT_FOUND).json({ msg: "User not found" });

    await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(httpStatus.OK).json({ msg: "User successfully deleted" });
  }
);
