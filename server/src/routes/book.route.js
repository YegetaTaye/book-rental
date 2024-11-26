const router = require("express").Router();
const { validate } = require("../middleware/validate");
const { bookSchema } = require("../validations/book.validation");

const {
  addBook,
  getAllBook,
  getBookById,
  updateBook,
  deleteBook,
  numberOfAllBook,
} = require("../controllers");

router.post("/", validate(bookSchema), addBook);
router.get("/", getAllBook);
router.get("/count", numberOfAllBook);
router.get("/:id", getBookById);
router.put("/:id", validate(bookSchema), updateBook);
router.delete("/:id", deleteBook);

const bookRouter = router;
module.exports = bookRouter;
