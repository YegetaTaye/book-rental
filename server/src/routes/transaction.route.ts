import express from "express";
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
  returnTransaction,
  updateTransaction,
  getOverdueTransactions,
} from "../controllers";
import { validate } from "../middleware/";
import { transactionSchema, returnTransactionSchema } from "../validations";

const router = express.Router();

router.get("/overdue", getOverdueTransactions);
router.get("/:id?", getTransactions);
// router.get("/byUser/:id", getTransactionByUserId);
// router.get("/:id", getTransactionByTransactionId);

router.post("/", validate(transactionSchema), addTransaction);
router.put("/:id", validate(transactionSchema), updateTransaction);
router.put("/:id/return", validate(returnTransactionSchema), returnTransaction);

router.delete("/:id", deleteTransaction);

export { router as TransactionRoute };
