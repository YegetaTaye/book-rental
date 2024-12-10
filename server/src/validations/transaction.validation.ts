import Joi from "joi";

export const transactionSchema = {
  body: Joi.object().keys({
    userId: Joi.number()
      .integer()
      .min(1)
      .max(4294967295)
      .strict()
      .required()
      .messages({
        "number.base": '"userId" should be a type of number',
        "number.integer": '"userId" must be an integer',
        "number.min": '"userId" must be greater than or equal to 1',
        "number.max": '"userId" cannot be greater than 4294967295',
        "any.required": '"userId" is a required field',
      }),

    bookId: Joi.number()
      .integer()
      .min(1)
      .max(4294967295)
      .strict()
      .required()
      .messages({
        "number.base": '"bookId" should be a type of number',
        "number.integer": '"bookId" must be an integer',
        "number.min": '"bookId" must be greater than or equal to 1',
        "number.max": '"bookId" cannot be greater than 4294967295',
        "any.required": '"bookId" is a required field',
      }),

    rentalDate: Joi.date().optional().messages({
      "date.base": '"rentalDate" should be a valid date',
      "any.required": '"rentalDate" is a required field',
    }),

    dueDate: Joi.number().integer().min(0).required().messages({
      "number.base": '"dueDate" should be a type of number',
      "number.integer": '"dueDate" must be an integer',
      "number.min": '"dueDate" must be at least 0',
      "any.required": '"dueDate" is a required field',
    }),

    status: Joi.string()
      .valid("PENDING", "RETURNED", "OVERDUE, CANCELLED")
      .optional()
      .messages({
        "string.base": '"status" should be a type of string',
        "string.empty": '"status" cannot be an empty field',
      }),

    returnedDate: Joi.date().optional().messages({
      "date.base": '"returnedDate" should be a valid date',
    }),
  }),
};
