const Joi = require("joi");

module.exports = {
  transactionSchema: {
    body: Joi.object().keys({
      userId: Joi.string().required().messages({
        "string.base": '"userId" should be a type of string',
        "string.empty": '"userId" cannot be an empty field',
        "any.required": '"userId" is a required field',
      }),

      bookId: Joi.string().required().messages({
        "string.base": '"bookId" should be a type of string',
        "string.empty": '"bookId" cannot be an empty field',
        "any.required": '"bookId" is a required field',
      }),

      rentalDate: Joi.date().required().messages({
        "date.base": '"rentalDate" should be a valid date',
        "any.required": '"rentalDate" is a required field',
      }),

      dueDate: Joi.number().integer().min(0).required().messages({
        "number.base": '"dueDate" should be a type of number',
        "number.integer": '"dueDate" must be an integer',
        "number.min": '"dueDate" must be at least 0',
        "any.required": '"dueDate" is a required field',
      }),

      returnedDate: Joi.date().optional().messages({
        "date.base": '"returnedDate" should be a valid date',
      }),

      lateFee: Joi.number().precision(2).min(0).optional().messages({
        "number.base": '"lateFee" should be a type of number',
        "number.min": '"lateFee" must be at least 0',
      }),
    }),
  },
};
