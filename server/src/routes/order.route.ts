import express from "express";
import { addOrder, deleteOrder, getOrders } from "../controllers";
import { validate } from "../middleware/";
import { orderSchema } from "../validations";

const router = express.Router();

router.get("/:id?", getOrders);
// router.get("/count", numberOfAllOrders);

router.post("/", validate(orderSchema), addOrder);
// router.put("/:id", validate(orderSchema), updateById);

router.delete("/:id", deleteOrder);

export { router as Orderoute };

