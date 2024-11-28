import express from "express";
import bodyParser from "body-parser";
import { ApiError } from "./utils";
import httpStatus from "http-status";
import { errorHandler, errorConverter } from "./middleware";

import {
  AdminRoute,
  BookRoute,
  UserRoute,
  TransactionRoute,
  Orderoute,
} from "./routes";

//Middleware
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use("/admin", AdminRoute);
app.use("/books", BookRoute);
app.use("/users", UserRoute);
app.use("/transactions", TransactionRoute);
app.use("/orders", Orderoute);

//Error Handling Middleware
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});
app.use(errorConverter);
app.use(errorHandler);

const server = app.listen(3000, () => {
  console.clear();
  console.log("Listening to port 3000");
});

//Uncought error handler(unhandled exceptions and promise rejections)
const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};
const unExpectedErrorHandler = (error: any) => {
  console.log(error);
  exitHandler();
};

process.on("uncaughtException", unExpectedErrorHandler);
process.on("unhandledRejection", unExpectedErrorHandler);
