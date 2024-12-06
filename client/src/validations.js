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
