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
        .json({ message: "User does not exist" });

    const book = await prisma.book.findUnique({
      where: {
        id: parseInt(bookId),
      },
    });

    if (!book)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Book does not exist" });

    const order = await prisma.order.create({
      data: {
        userId: userId,
        bookId: bookId,
        status: status ? status.toUpperCase() : status,
        orderDate: orderDate,
      },
    });

    return res.status(httpStatus.CREATED).json({
      message: "Order successfully added",
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
        select: {
          id: true,
          status: true,
          orderDate: true,
          book: {
            select: {
              id: true,
              title: true,
            },
          },
          user: {
            select: {
              id: true,
              fullName: true,
            },
          },
        },
      });

      if (!orders)
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ message: "Orders do not exist" });
    } else {
      orders = await prisma.order.findMany({
        select: {
          id: true,
          status: true,
          orderDate: true,
          book: {
            select: {
              title: true,
            },
          },
          user: {
            select: {
              fullName: true,
            },
          },
        },
      });
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
        .json({ message: "Order does not exist" });

    await prisma.order.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res
      .status(httpStatus.OK)
      .json({ message: "Order successfully deleted" });
  }
);

export const acceptOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { dueDate } = req.body;

    CheckValidParam(id, res);

    const order = await prisma.order.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!order)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Order does not exist" });

    if (order.status === "ACCEPTED")
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Order is already accepted" });

    await prisma.transaction.create({
      data: {
        userId: order.userId,
        bookId: order.bookId,
        dueDate: dueDate,
        status: "PENDING",
        rentalDate: new Date(),
      },
    });

    await prisma.order.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: "ACCEPTED",
      },
    });

    return res
      .status(httpStatus.OK)
      .json({ message: "Order successfully accepted" });
  }
);

export const rejectOrder = catchAsync(
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
        .json({ message: "Order does not exist" });

    if (order.status === "CANCELLED")
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Order is already cancelled" });

    await prisma.order.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status: "CANCELLED",
      },
    });

    return res
      .status(httpStatus.OK)
      .json({ message: "Order successfully Cancelled" });
  }
);
