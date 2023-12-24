const router = require("express").Router();

const {addTranscation, getAllTransaction,getTransactionByTransactionId, getTransactionByUserId, bookReturned} = require("../transaction/transactionController");

router.post("/", addTranscation);
router.get("/", getAllTransaction);
router.get("/byUser/:id", getTransactionByUserId);
router.get("/:id", getTransactionByTransactionId);
router.post("/return", bookReturned);

module.exports = router;