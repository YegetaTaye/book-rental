import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { catchAsync, CheckValidParam } from "../utils";
import { PrismaClient, TransactionStatus } from "@prisma/client";

const prisma = new PrismaClient();

export const addTransaction = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, bookId, rentalDate, dueDate, returnedDate, status } =
      req.body;

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
    else {
      if (book.availableCopies <= 0)
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ msg: "Book is not available in store at moment" });
    }

    const transaction = await prisma.transaction.create({
      data: {
        userId: userId,
        bookId: bookId,
        rentalDate: rentalDate,
        dueDate: dueDate,
        returnedDate: returnedDate,
        status: status ? status.toUpperCase() : status,
      },
    });

    await prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        availableCopies: book.availableCopies - 1,
      },
    });

    return res.status(httpStatus.CREATED).json({
      msg: "Transaction successfully added",
      transaction,
    });
  }
);

export const getTransactions = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let { status } = req.query;
    status = Array.isArray(status) ? status[0] : status;

    let transactions;

    if (id) {
      CheckValidParam(id, res);
      transactions = await prisma.transaction.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!transactions) {
        return res
          .status(httpStatus.NOT_FOUND)
          .json({ error: "Transaction not found" });
      }
    } else if (status) {
      transactions = await prisma.transaction.findMany({
        where: {
          status: status as TransactionStatus,
        },
      });
    } else {
      transactions = await prisma.transaction.findMany();
    }

    return res.status(httpStatus.OK).json(transactions);
  }
);

export const deleteTransaction = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    CheckValidParam(id, res);

    const transaction = await prisma.transaction.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!transaction)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ msg: "Transaction does not exist" });

    await prisma.transaction.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res
      .status(httpStatus.NO_CONTENT)
      .json({ msg: "Transaction successfully deleted" });
  }
);

export const updateTransaction = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { userId, bookId, rentalDate, dueDate, returnedDate, status } =
      req.body;

    CheckValidParam(id, res);
    CheckValidParam(userId, res);
    CheckValidParam(bookId, res);

    const transaction = await prisma.transaction.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!transaction)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ msg: "Transaction does not exist" });

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

    await prisma.transaction.update({
      where: {
        id: parseInt(id),
      },
      data: {
        userId: userId,
        bookId: bookId,
        rentalDate: rentalDate,
        dueDate: dueDate,
        returnedDate: returnedDate,
        status: status ? status.toUpperCase() : status,
      },
    });

    return res
      .status(httpStatus.OK)
      .json({ msg: "Transaction successfully updated", transaction });
  }
);

export const returnTransaction = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { returnedDate } = req.body;

    CheckValidParam(id, res);

    const transaction = await prisma.transaction.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!transaction)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ msg: "Transaction does not exist" });

    await prisma.transaction.update({
      where: {
        id: parseInt(id),
      },
      data: {
        returnedDate: returnedDate,
        status: "RETURNED",
      },
    });

    const book = await prisma.book.findUnique({
      where: {
        id: transaction.bookId,
      },
    });

    await prisma.book.update({
      where: {
        id: transaction.bookId,
      },
      data: {
        availableCopies: book!.availableCopies + 1,
      },
    });

    return res
      .status(httpStatus.OK)
      .json({ msg: "Transaction successfully returned", transaction });
  }
);
