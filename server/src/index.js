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
app.use("/book", bookRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);
app.use("/transaction", transactionRouter);

// Start the server
connectDatabase();
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));