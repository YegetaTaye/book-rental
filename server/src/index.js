require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDatabase = require("./config/database");
const {
  bookRouter,
  userRouter,
  transactionRouter,
  orderRouter,
} = require("./routes");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/books", bookRouter);
app.use("/users", userRouter);
app.use("/orders", orderRouter);
app.use("/transactions", transactionRouter);

// Start the server
connectDatabase();
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
