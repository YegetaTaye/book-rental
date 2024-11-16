const router = require("express").Router();

const {
  addTranscation,
  getAllTransaction,
  getTransactionByTransactionId,
  getTransactionByUserId,
  bookReturned,
  numberOfAllTransaction,
  numberOfAllBook,
} = require("../controllers");

router.post("/", addTranscation);
router.get("/", getAllTransaction);
router.get("/count", numberOfAllTransaction);
router.get("/byUser/:id", getTransactionByUserId);
router.get("/:id", getTransactionByTransactionId);
router.post("/return", bookReturned);

const transactionRouter = router;
module.exports = transactionRouter;
