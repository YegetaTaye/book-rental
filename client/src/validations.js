import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters long"),
  author: z.string().min(2, "Author name must be at least 2 characters long"),
  bookCode: z.string().min(3, "Book code must be at least 3 characters long"),
  publicationYear: z
    .number()
    .int()
    .min(1000)
    .max(new Date().getFullYear(), "Invalid publication year"),
  totalCopies: z.number().int().min(1, "Total copies must be at least 1"),
  availableCopies: z.number().int().min(0),
});

export const signupSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long" }),
  idNumber: z
    .string()
    .min(10, { message: "ID number must be 10 characters long" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  blockNumber: z
    .string()
    .length(2, { message: "Block number must be 2 numbers long" }),
});
