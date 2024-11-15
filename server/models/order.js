const mongoose = require("mongoose");

// Order Schema
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    orderDate: Date,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;