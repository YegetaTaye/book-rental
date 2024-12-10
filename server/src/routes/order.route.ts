import express from "express";
import {
  addOrder,
  deleteOrder,
  getOrders,
  acceptOrder,
  rejectOrder,
} from "../controllers";
import { validate } from "../middleware/";
import { orderSchema, statusSchema } from "../validations";

const router = express.Router();

router.get("/:id?", getOrders);
// router.get("/count", numberOfAllOrders);

router.post("/", validate(orderSchema), addOrder);
router.put("/accept/:id", validate(statusSchema), acceptOrder);
router.put("/cancel/:id", validate(statusSchema), rejectOrder);

router.delete("/:id", deleteOrder);

export { router as Orderoute };
