import Joi from "joi";

export interface userPayload {
  id: Number;
  email: string;
  fullname: string;
}

export const userSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      "string.base": '"email" should be a type of string',
      "string.empty": '"email" cannot be an empty field',
      "string.email": '"email" must be a valid email',
      "any.required": '"email" is a required field',
    }),

    password: Joi.string()
      .min(6) // Minimum length for password
      .required()
      .messages({
        "string.base": '"password" should be a type of string',
        "string.empty": '"password" cannot be an empty field',
        "string.min": '"password" should have a minimum length of {#limit}',
        "any.required": '"password" is a required field',
      }),

    fullName: Joi.string().required().messages({
      "string.base": '"fullName" should be a type of string',
      "string.empty": '"fullName" cannot be an empty field',
      "any.required": '"fullName" is a required field',
    }),

    phone: Joi.string().required().messages({
      "number.base": '"phone" should be a type of string',
      "any.required": '"phone" is a required field',
    }),

    idNumber: Joi.string().required().messages({
      "string.base": '"idNumber" should be a type of string',
      "string.empty": '"idNumber" cannot be an empty field',
      "any.required": '"idNumber" is a required field',
    }),

    blockNumber: Joi.string().required().messages({
      "string.base": '"blockNumber" should be a type of string',
      "string.empty": '"blockNumber" cannot be an empty field',
      "any.required": '"blockNumber" is a required field',
    }),
  }),
};
export const loginSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().required().messages({
      "string.base": '"email" should be a type of string',
      "string.empty": '"email" cannot be an empty field',
      "string.email": '"email" must be a valid email',
      "any.required": '"email" is a required field',
    }),

    password: Joi.string().required().messages({
      "string.base": '"password" should be a type of string',
      "string.empty": '"password" cannot be an empty field',
      "any.required": '"password" is a required field',
    }),
  }),
};
