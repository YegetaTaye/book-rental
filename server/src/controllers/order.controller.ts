import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { catchAsync, CheckValidParam } from "../utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, bookId, status, orderDate } = req.body;

    CheckValidParam(userId, res);
    CheckValidParam(bookId, res);

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!user)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ msg: "User does not exist" });

    const book = await prisma.book.findUnique({
      where: {
        id: parseInt(bookId),
      },
    });

    if (!book)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ msg: "Book does not exist" });

    const order = await prisma.order.create({
      data: {
        userId: userId,
        bookId: bookId,
        status: status ? status.toUpperCase() : status,
        orderDate: orderDate,
      },
    });

    return res.status(httpStatus.CREATED).json({
      msg: "Order successfully added",
      order,
    });
  }
);

export const getOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    let orders;

    if (id) {
      CheckValidParam(id, res);
      orders = await prisma.order.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!orders)
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ msg: "Orders do not exist" });
    } else {
      orders = await prisma.order.findMany();
    }

    return res.status(httpStatus.OK).json(orders);
  }
);

export const deleteOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    CheckValidParam(id, res);

    const order = await prisma.order.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!order)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ msg: "Order does not exist" });

    await prisma.order.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res
      .status(httpStatus.OK)
      .json({ msg: "Order successfully deleted" });
  }
);