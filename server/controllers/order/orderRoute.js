const router = require("express").Router();

const {addOrder, getAllOrders, getOrderById, deleteOrderById, updateById, numberOfAllOrders} = require("../order/orderController");

router.post("/", addOrder);
router.get("/", getAllOrders);
router.get("/count", numberOfAllOrders)
router.get("/:id", getOrderById);
router.delete("/:id", deleteOrderById);
router.put("/:id", updateById);

module.exports = router;