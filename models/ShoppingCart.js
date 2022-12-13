const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
  userId:{ type: mongoose.Types.ObjectId, ref: "users", required: true },
  productId:{type: mongoose.Types.ObjectId, ref: "products", required: true }
});


const ShoppingCart = mongoose.model('ShoppingCart', schema);
module.exports = ShoppingCart;