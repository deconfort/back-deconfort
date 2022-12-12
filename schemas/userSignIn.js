const joi = require("joi");

const schema = joi.object({
  mail: joi.string().required().email({ minDomainSegments: 2 }).messages({
    "any.required": "Enter your email, please",
    "string.empty": "Enter your email, please",
    "string.email": "Enter your email, please",
  }),
  password: joi.string().required().messages({
    "any.required": "Enter your password, please",
    "string.empty": "Enter your password, please",
  }),
});

module.exports = schema;
