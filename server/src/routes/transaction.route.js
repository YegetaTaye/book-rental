const router = require("express").Router();
const { validate } = require("../middleware/validate");
const { transactionSchema } = require("../validations/transaction.validation");

const {
  addTranscation,
  getAllTransaction,
  getTransactionByTransactionId,
  getTransactionByUserId,
  bookReturned,
  numberOfAllTransaction,
  numberOfAllBook,
} = require("../controllers");

router.post("/", validate(transactionSchema), addTranscation);
router.get("/", getAllTransaction);
router.get("/count", numberOfAllTransaction);
router.get("/byUser/:id", getTransactionByUserId);
router.get("/:id", getTransactionByTransactionId);
router.post("/return", bookReturned);

const transactionRouter = router;
module.exports = transactionRouter;
