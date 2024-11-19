const joi = require("joi");

const validate = (schema) => (req, res, next) => {
  const keys = Object.keys(schema);
  const object = keys.reduce((obj, key) => {
    if (Object.prototype.hasOwnProperty.call(req, key)) {
      obj[key] = req[key];
    }
    return obj;
  }, {});

  const { error } = joi.compile(schema).validate(object, { abortEarly: false }); // Validate all errors, not just the first
  if (error) {
    // Collect all custom messages
    const errors = error.details.map((detail) => detail.message).join(", ");
    return res.status(400).json({ errors: errors });
  } else {
    next(); // Proceed to the next middleware
  }
};

module.exports = { validate };
