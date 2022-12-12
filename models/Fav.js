const mongoose = require("mongoose");

const schema = mongoose.Schema({
  productId: { type: mongoose.Types.ObjectId, ref: "itineraries"},
  name: { type: String, required: true },
  icon: { type: String, required: true },
  iconBack: { type: String, required: true },
  userId: [{ type: mongoose.Types.ObjectId, ref: "users", required: true }],
});

const Fav = mongoose.model("favs", schema);
module.exports = Fav;  
