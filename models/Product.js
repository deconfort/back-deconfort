const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  
    category: {type:String,required: true},
    name: {type:String, required:true},
    color: {type:String},
    photo: [{type:String, required:true}],
    description: {type:String, required:true},
    date: {type: Date, required:true},
    price: {type:Number,required:true},
    userId: {type: mongoose.Types.ObjectId, ref:"users", required:true},
});


const Product = mongoose.model('products', schema);
module.exports = Product;