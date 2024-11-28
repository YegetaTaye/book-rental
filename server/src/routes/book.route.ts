import express from "express";
import { addBook, deleteBook, getBooks, updateBook } from "../controllers";
import { validate } from "../middleware/";
import { bookSchema } from "../validations";

const router = express.Router();

router.post("/", validate(bookSchema), addBook);
router.get("/:id?", getBooks);
// router.get("/count", numberOfAllBook);
router.put("/:id", validate(bookSchema), updateBook);
router.delete("/:id", deleteBook);

export { router as BookRoute };
