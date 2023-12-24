const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    rentalDate: Date,
    dueDate: Number,
    returnDate: Date,
    lateFee: Number,
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;