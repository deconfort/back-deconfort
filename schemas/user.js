const joi = require('joi')

const schema = joi.object({
    name: joi.string()
        .required()
        .min(3)
        .max(50)
        .messages({
            'any.required': 'Name Required',
            'string.empty': 'Name Required',
            'string.min': 'The name is too short',
            'string.max': 'The name is too large',
        }),
        lastName: joi.string()
        .required()
        .min(3)
        .max(50)
        .messages({
            'any.required': 'Lastname Required',
            'string.empty': 'Lastname Required',
            'string.min': 'The lastname is too short',
            'string.max': 'The lastname is too large',
        }),
        role: joi.string().valid('user', 'admin'),
        photo: joi.string()
        .required()
        .uri()
        .messages({
            "any.required": "The field 'URL photo' is required, please complete it",
            "string.empty": "Complete the field 'URL photo', please",
            "string.uri": "The field 'URL photo' must be an url",
        }),
    age: joi.number()
        .required()
        .min(18)
        .messages({
            'any.required': 'The age is required',
            'number.base': 'The age is required',
            'number.min': 'You must to be older than 18 years old',
        }),
        country: joi.string()
        .required()
        .min(3)
        .max(50)
        .messages({
            'any.required': 'country Required',
            'string.empty': 'country Required',
            'string.min': 'The country is too short',
            'string.max': 'The country is too large',
        }),
    mail: joi.string()
        .required()
        .email({minDomainSegments: 2})
        .messages({
            'any.required': 'Enter your email, please',
            'string.empty': 'Enter your email, please',
            'string.email': 'Enter your email, please'
        }),
    password: joi.string().required().messages({
        'any.required': 'Enter your password, please',
        'string.empty': 'Enter your password, please',
    })
    // confirmPassword: joi.string().equal(joi.ref('password'))
    // .required()
    // .label('Confirm password')
    // .messages({ 'any.only': 'Passwords dont match.' })
       
   
})

module.exports = schema