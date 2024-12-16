import express from "express";
import {
  getNumberData,
  getNumberOfTransactionsForEachDayOfCurrentMonth,
  getNumberOfOrdersForEachDayOfCurrentMonth,
  getTheLastFiveOrders,
} from "../controllers";

const router = express.Router();

router.get("/numberData", getNumberData);
router.get(
  "/numberOfTransactionsForEachDayOfCurrentMonth",
  getNumberOfTransactionsForEachDayOfCurrentMonth
);
router.get(
  "/numberOfOrdersForEachDayOfCurrentMonth",
  getNumberOfOrdersForEachDayOfCurrentMonth
);
router.get("/lastFiveOrders", getTheLastFiveOrders);

export { router as AnalyticsRoute };
