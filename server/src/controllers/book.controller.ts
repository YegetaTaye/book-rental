import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { catchAsync, CheckValidParam } from "../utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addBook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      title,
      author,
      bookCode,
      publicationYear,
      tag,
      totalCopies,
      availableCopies,
      rentalFee,
      lateFeePerDay,
    } = req.body;

    const book = await prisma.book.findUnique({
      where: {
        bookCode: bookCode,
      },
    });

    if (book)
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ msg: "Book already exists with a given book code" });

    await prisma.book.create({
      data: {
        title: title,
        author: author,
        bookCode: bookCode,
        publicationYear: publicationYear,
        tag: tag,
        totalCopies: totalCopies,
        availableCopies: availableCopies,
        rentalFee: rentalFee,
        lateFeePerDay: lateFeePerDay,
      },
    });

    return res.status(httpStatus.CREATED).json({
      msg: "Book successfully added",
    });
  }
);

export const getBooks = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { bookCode } = req.query;

    let books;

    if (id) {
      CheckValidParam(id, res);
      books = await prisma.book.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      if (!books)
        return res.status(httpStatus.NOT_FOUND).json({ msg: "Book not found" });
    } else if (bookCode) {
      books = await prisma.book.findMany({
        where: {
          bookCode: Array.isArray(bookCode) ? bookCode[0] : bookCode,
        },
      });
    } else {
      books = await prisma.book.findMany();
    }

    return res.status(httpStatus.OK).json(books);
  }
);

export const updateBook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    CheckValidParam(id, res);

    const {
      title,
      author,
      publicationYear,
      totalCopies,
      tag,
      availableCopies,
      rentalFee,
      lateFeePerDay,
    } = req.body;

    const book = await prisma.book.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!book)
      return res.status(httpStatus.NOT_FOUND).json({ msg: "Book not found" });

    const updatedBook = await prisma.book.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: title,
        author: author,
        publicationYear: publicationYear,
        tag: tag,
        totalCopies: totalCopies,
        availableCopies: availableCopies,
        rentalFee: rentalFee,
        lateFeePerDay: lateFeePerDay,
      },
    });

    return res.status(httpStatus.OK).json({
      msg: "Book successfully updated",
    });
  }
);

export const deleteBook = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    CheckValidParam(id, res);

    const book = await prisma.book.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!book)
      return res.status(httpStatus.NOT_FOUND).json({ msg: "Book not found" });

    await prisma.book.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(httpStatus.OK).json({
      msg: "Book successfully deleted",
    });
  }
);
