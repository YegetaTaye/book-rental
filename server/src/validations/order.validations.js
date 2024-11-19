const Joi = require("joi");

module.exports = {
  orderSchema: {
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

      orderDate: Joi.date().required().messages({
        "date.base": '"orderDate" should be a valid date',
        "any.required": '"orderDate" is a required field',
      }),
    }),
  },
};
