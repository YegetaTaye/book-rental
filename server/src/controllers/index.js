const bookController = require("./book.controller.js");
const transactionController = require("./transaction.controller.js");
const userController = require("./user.controller.js");
const orderController = require("./order.controller.js");

module.exports = {
  ...bookController,
  ...transactionController,
  ...userController,
  ...orderController,
};
