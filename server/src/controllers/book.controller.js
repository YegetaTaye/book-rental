const express = require("express");
const Book = require("../models/book.model");
const bookSchema = require("../validations/book.validation");

module.exports = {
  // Function to save a new Book
  addBook: async (req, res) => {
    try {
      const {
        title,
        author,
        bookCode,
        publicationYear,
        totalCopies,
        availableCopies,
        rentalFee,
      } = req.body;

      if (availableCopies > totalCopies)
        return res.status(404).json({
          msg: "Available copies can't be greater than total copies.",
        });

      const newBook = {
        title: title,
        author: author,
        bookCode: bookCode,
        publicationYear: publicationYear,
        totalCopies: totalCopies,
        availableCopies: availableCopies,
        rentalFee: rentalFee,
      };

      const book = await Book.create(newBook);
      return res.status(201).json(book);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ msg: err.message });
    }
  },
  // Function to Get All Books from database
  getAllBook: async (req, res) => {
    try {
      const books = await Book.find({});
      return res.status(200).json({ count: books.length, data: books });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: err.message });
    }
  },
  //Function to get one book from database by id
  getBookById: async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);

      if (!book) return res.status(400).json({ msg: "Book not found" });
      return res.status(200).json(book);
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ msg: err.message });
    }
  },
  //Function to update a book
  updateBook: async (req, res) => {
    try {
      const { id } = req.params;

      const {
        title,
        author,
        publicationYear,
        totalCopies,
        availableCopies,
        rentalFee,
      } = req.body;
      // console.log(title, author, publicationYear, totalCopies, availableCopies, rentalFee)
      if (availableCopies > totalCopies)
        return res.status(404).json({
          msg: "Available copies can't be greater than total copies.",
        });

      const updated = await Book.findByIdAndUpdate(id, req.body);

      if (!updated) return res.status(404).json({ msg: "Book not found" });
      return res.status(200).json({ msg: "Book updated successfully" });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ msg: err.message });
    }
  },
  //Function to delete one book
  deleteBook: async (req, res) => {
    try {
      const { id } = req.params;

      const book = await Book.findOneAndDelete({ _id: id });
      if (!book) return res.status(400).json({ msg: "Book not found" });
      return res.status(200).json({ msg: "Book deleted successfully" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ msg: err.message });
    }
  },
  // Function to Get The Number of Books
  numberOfAllBook: async (req, res) => {
    try {
      const books = await Book.find({});
      return res.status(200).json({ count: books.length });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: err.message });
    }
  },
};
