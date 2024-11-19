const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  rentalDate: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Number,
    required: true,
  },
  returnedDate: Date,
  lateFee: Number,
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
