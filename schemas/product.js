const joi = require("joi");

const schema = joi.object({
  category: joi.string().required().messages({
    "string.base": "Enter the category of the product please",
    "any.required": "Complete this field, please",
    "string.empty": "Complete the category of the product, please",
  }),
  name: joi.string().required().min(3).max(20).messages({
    "string.base": "Enter the name of the product please",
    "any.required": "Complete this field, please",
    "string.empty": "Complete the name of the product, please",
    "string.min": "Min three characters in the field name",
    "string.max": "Max twenty characters",
  }),
  
  color: joi.string().messages,
  photo: joi.array().items(joi.string().required().uri().messages({
    "any.required": "Complete this input, please",
    "string.empty": "Complete the URL photo, please",
    "string.uri": "The field 'photo' must be an url"
  })),
  description: joi.string().required().min(3).max(20).messages({
    "string.base": "Enter the description of the product please",
    "any.required": "Complete this field, please",
    "string.empty": "Complete the description of the product, please",
    "string.min": "Min three characters in the field product",
    "string.max": "Max twenty characters",
  }),
  date: joi.date().required(),
  userId: joi.any(),
});

module.exports = schema;