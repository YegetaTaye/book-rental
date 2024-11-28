import express from "express";
import {
    addTransaction,
    deleteTransaction,
    getTransactions,
    returnTransaction,
    updateTransaction,
} from "../controllers";
import { validate } from "../middleware/";
import { transactionSchema } from "../validations";

const router = express.Router();

router.get("/:id?", getTransactions);
// router.get("/count", numberOfAllTransaction);
// router.get("/byUser/:id", getTransactionByUserId);
// router.get("/:id", getTransactionByTransactionId);

router.post("/", validate(transactionSchema), addTransaction);
router.put("/:id", validate(transactionSchema), updateTransaction);
router.post("/:id/return", returnTransaction);

router.delete("/:id", deleteTransaction);

export { router as TransactionRoute };

