import Joi from "joi";

export const bookSchema = {
  body: Joi.object().keys({
    title: Joi.string().required().messages({
      "string.base": '"title" should be a type of string',
      "string.empty": '"title" cannot be an empty field',
      "any.required": '"title" is a required field',
    }),

    author: Joi.string().required().messages({
      "string.base": '"author" should be a type of string',
      "string.empty": '"author" cannot be an empty field',
      "any.required": '"author" is a required field',
    }),

    bookCode: Joi.string().required().messages({
      "string.base": '"bookCode" should be a type of string',
      "string.empty": '"bookCode" cannot be an empty field',
      "any.required": '"bookCode" is a required field',
    }),

    tag: Joi.string().allow(null).optional().messages({
      "string.base": '"tag" should be a type of string',
    }),

    publicationYear: Joi.number()
      .integer()
      .min(1000)
      .max(new Date().getFullYear())
      .strict()
      .optional()
      .messages({
        "number.base": '"publicationYear" should be a type of number',
        "number.integer": '"publicationYear" must be an integer',
        "number.min": '"publicationYear" must be greater than or equal to 1000',
        "number.max": `"publicationYear" cannot be greater than the current year (${new Date().getFullYear()})`,
      }),

    totalCopies: Joi.number().integer().min(0).required().messages({
      "number.base": '"totalCopies" should be a type of number',
      "number.integer": '"totalCopies" must be an integer',
      "number.min": '"totalCopies" must be at least 0',
      "any.required": '"totalCopies" is a required field',
    }),

    availableCopies: Joi.number().integer().min(0).optional().messages({
      "number.base": '"availableCopies" should be a type of number',
      "number.integer": '"availableCopies" must be an integer',
      "number.min": '"availableCopies" must be at least 0',
    }),

    rentalFee: Joi.number().precision(2).min(0).optional().default(2).messages({
      "number.base": '"rentalFee" should be a type of number',
      "number.min": '"rentalFee" must be at least 0',
    }),

    lateFeePerDay: Joi.number()
      .precision(2)
      .min(0)
      .optional()
      .default(2)
      .messages({
        "number.base": '"lateFeePerDay" should be a type of number',
        "number.min": '"lateFeePerDay" must be at least 0',
      }),
  }),
};
