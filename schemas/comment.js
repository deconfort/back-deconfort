const joi = require("joi");

const schema = joi.object({

  userId: joi.any(),
  comment: joi.string().required().min(3).messages({
    "string.min": "Name: min 3 characters",
  }),
  date: joi.date().required(),
  photo: joi.string().required(),
  reports: joi.any()

});

module.exports = schema;