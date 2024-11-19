const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publicationYear: Number,
  totalCopies: {
    type: Number,
    required: true,
  },
  availableCopies: Number,
  rentalFee: {
    type: Number,
    default: 2,
  },
  lateFeePerDay: {
    type: Number,
    default: 2,
  },
});

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
