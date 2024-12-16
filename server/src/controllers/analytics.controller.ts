import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { catchAsync, CheckValidParam } from "../utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getNumberData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const numberOfBooks = await prisma.book.count();
    const numberOfUsers = await prisma.user.count();
    const numberOfTransactions = await prisma.transaction.count();
    const numberOfOrders = await prisma.order.count();
    const numberOfAdmins = await prisma.user.count({
      where: {
        isAdmin: true,
      },
    });

    return res.status(httpStatus.OK).json({
      numberOfBooks,
      numberOfUsers,
      numberOfTransactions,
      numberOfOrders,
      numberOfAdmins,
    });
  }
);
// const today = new Date();
// const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
// const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

export const getNumberOfTransactionsForEachDayOfCurrentMonth = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const transactions = await prisma.transaction.findMany({
      where: {
        rentalDate: {
          gte: firstDay,
          lte: lastDay,
        },
      },
    });

    const numberOfTransactionsForEachDayOfCurrentMonth = Array.from(
      { length: lastDay.getDate() },
      (_, i) => {
        const date = new Date(today.getFullYear(), today.getMonth(), i + 1);
        const count = transactions.filter(
          (transaction) => transaction.rentalDate.getDate() === date.getDate()
        ).length;

        return {
          //   date: date.toISOString(),
          date: date.toLocaleDateString("en-CA"), // Format: YYYY-MM-DD in local time
          count,
        };
      }
    );

    return res.status(httpStatus.OK).json({
      count: numberOfTransactionsForEachDayOfCurrentMonth.length,
      numberOfTransactionsForEachDayOfCurrentMonth,
    });
  }
);

export const getTheLastFiveOrders = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await prisma.order.findMany({
      take: 5,
      orderBy: {
        orderDate: "desc",
      },
    });

    return res.status(httpStatus.OK).json(orders);
  }
);

export const getNumberOfOrdersForEachDayOfCurrentMonth = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const orders = await prisma.order.findMany({
      where: {
        orderDate: {
          gte: firstDay,
          lte: lastDay,
        },
      },
    });

    const numberOfOrdersForEachDayOfCurrentMonth = Array.from(
      { length: lastDay.getDate() },
      (_, i) => {
        const date = new Date(today.getFullYear(), today.getMonth(), i + 1);
        const count = orders.filter(
          (order) => order.orderDate.getDate() === date.getDate()
        ).length;

        return {
          date: date.toLocaleDateString("en-CA"),
          count,
        };
      }
    );

    return res.status(httpStatus.OK).json({
      count: numberOfOrdersForEachDayOfCurrentMonth.length,
      numberOfOrdersForEachDayOfCurrentMonth,
    });
  }
);
