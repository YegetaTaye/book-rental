const router = require("express").Router();

const { numberOfAllBook } = require("../book/bookController");
const {addTranscation, getAllTransaction,getTransactionByTransactionId, getTransactionByUserId, bookReturned, numberOfAllTransaction} = require("../transaction/transactionController");

router.post("/", addTranscation);
router.get("/", getAllTransaction);
router.get("/count", numberOfAllTransaction)
router.get("/byUser/:id", getTransactionByUserId);
router.get("/:id", getTransactionByTransactionId);
router.post("/return", bookReturned);

module.exports = router;