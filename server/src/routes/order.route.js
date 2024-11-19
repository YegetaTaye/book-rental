const router = require("express").Router();
const { validate } = require("../middleware/validate");
const { orderSchema } = require("../validations/order.validations");

const {
  addOrder,
  getAllOrders,
  getOrderById,
  deleteOrderById,
  updateById,
  numberOfAllOrders,
} = require("../controllers");

router.post("/", validate(orderSchema), addOrder);
router.get("/", getAllOrders);
router.get("/count", numberOfAllOrders);
router.get("/:id", getOrderById);
router.delete("/:id", deleteOrderById);
router.put("/:id", updateById);

const orderRouter = router;
module.exports = orderRouter;
