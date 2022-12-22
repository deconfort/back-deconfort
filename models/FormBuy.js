const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    mail: { type: String, required: true },
    name: {
        type: String,
        required: true,
        min: 4,
        max: 100
    },
    lastName: {
        type: String,
        required: true,
        min: 4,
        max: 100
    },
    country: {
        type: String,
        required: true,
        min: 2,
        max: 100
    },
    state: {
        type: String,
        required: true,
        min: 2,
        max: 100
    },
    adress: {
        type: String,
        required: true,
        min: 2,
        max: 100
    },
    phone: {
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    productName: {
        type: Array,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    }
})

const FormBuy = mongoose.model(
    'formbuy',
    schema
)

module.exports = FormBuy