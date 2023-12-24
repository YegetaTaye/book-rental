const express = require("express");
const Book = require("../../models/book")

module.exports = {
    // Function to save a new Book
    addBook: async(req, res) => {
        try{
        const {title, author, publicationYear, totalCopies, availableCopies, rentalFee} = req.body;
        // console.log(title, author, publicationYear, totalCopies, availableCopies, rentalFee)
        
        if(!title || !author || !publicationYear || !totalCopies || !availableCopies || !rentalFee)
            return res.status(400).json({msg: "Not all fields have been provided"});
        //     //the JSON payload is the data that is sent as the body of the HTTP response

        const newBook = {
            title: title,
            author: author,
            publicationYear: publicationYear,
            totalCopies: totalCopies,
            availableCopies: availableCopies,
            rentalFee: rentalFee
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);
        }catch (err) {
            console.log(err.message);
            res.status(500).send({msg: err.message});
        }

    },
    // Function to Get All Books from database
    getAllBook: async(req, res) => {
        try{
            const books = await Book.find({});
            return res.status(200).json({count: await(books).length, data: books});
        }catch (err){
            console.log(err);
            res.status(500).send({msg: err.message});
        }
    },
    //Function to get one book from database by id
    getBookById: async(req, res) => {
        try{
            const { id } = req.params;
            const book = await Book.findById(id);
            
            if(!book)
                return res.status(400).json({msg : "Book not found"})
            return res.status(200).json(book);
        }catch (err) {
            console.log(err.message);
            res.status(500).send({msg: err.message})
        }
    },
    //Function to update a book
    updateBook: async (req, res) => {
        try{
            const { id } = req.params;

            const {title, author, publicationYear, totalCopies, availableCopies, rentalFee} = req.body;
            // console.log(title, author, publicationYear, totalCopies, availableCopies, rentalFee)

            if(!title || !author || !publicationYear || !totalCopies || !availableCopies || !rentalFee)
                return res.status(400).json({msg: "Not all fields have been provided"});

            console.log(req.body);
            const updated = await Book.findByIdAndUpdate(id, req.body);

            if (!updated)
                return res.status(404).json({msg: "Book not found"});
            return res.status(200).send({msg: "Book updated successfully"});
        }catch (err) {
            console.log(err.message);
            res.status(500).send({msg: err.message});
        }
    }, 
    //Function to delete one book
    deleteBook: async(req, res) => {
        try{
            const { id } = req.params;
            console.log(id);
            const book = await Book.findOneAndDelete({ _id: id });
            if(!book)
                return res.status(400).json({msg: "Book not found"});
            return res.status(200).send({msg: "Book deleted successfully"});
        }catch (err){
            console.log(err.message);
            return res.status(500).send({msg: err.message});
        }
    }

}