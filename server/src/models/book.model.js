const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: String,
    publicationYear: Number,
    totalCopies: Number,
    availableCopies: Number,
    rentalFee: Number,
    lateFeePerDay: {
        type: Number,
        default: 2
    }
});

const Book = mongoose.model("Book", BookSchema);
module.exports =  Book;