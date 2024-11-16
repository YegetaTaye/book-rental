const router = require("express").Router();

const {
  addBook,
  getAllBook,
  getBookById,
  updateBook,
  deleteBook,
  numberOfAllBook,
} = require("../controllers");

router.post("/", addBook);
router.get("/", getAllBook);
router.get("/count", numberOfAllBook);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

const bookRouter = router;
module.exports = bookRouter;
