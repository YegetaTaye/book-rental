const Order = require("../../models/order");

module.exports = {
  // Create a new order
  addOrder: async (req, res) => {
    try {
      const { userId, bookId } = req.body;
      if (!userId || !bookId)
        return res
          .status(404)
          .json({ msg: "Not all fields have been provided" });

      const newOrder = {
        userId: userId,
        bookId: bookId,
        orderDate: new Date(),
      };
      const order = await Order.create(newOrder);
      console.log(order);

      return res.status(201).send(order);
    } catch (error) {
      res.status(500).json({ error: "Error creating order" });
    }
  },
  // Retrieve all orders
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.find();
      return res.status(200).json({ count: orders.length, data: orders });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving orders" });
    }
  },

  // Retrieve a specific order by ID
  getOrderById: async (req, res) => {
    try {
      const order = await Order.findById({ _id: req.params.id });
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: "Error retrieving order" });
    }
  },

  // Update a specific order by ID
  updateById: async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      if (!updatedOrder) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ error: "Error updating order" });
    }
  },

  // Delete a specific order by ID
  deleteOrderById: async (req, res) => {
    try {
      const deletedOrder = await Order.findByIdAndDelete(req.params.id);
      if (!deletedOrder) {
        return res.status(404).json({ error: "Order not found" });
      }
      return res.status(200).json({ msg: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting order" });
    }
  },
  // Retrieve the number of all orders
  numberOfAllOrders: async (req, res) => {
    try {
      const orders = await Order.find();
      return res.status(200).json({ count: orders.length });
    } catch (error) {
      res.status(500).json({ error: "Error retrieving orders" });
    }
  },
};
