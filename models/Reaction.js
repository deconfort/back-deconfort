const mongoose = require("mongoose");

const schema = mongoose.Schema({
  commentId: { type: mongoose.Types.ObjectId,  ref: 'comments' },
  name: { type: String, required: true },
  icon: { type: String, required: true },
  iconBack: { type: String, required: true },
  userId: [{ type: mongoose.Types.ObjectId, ref: "users", required: true }],
});

const Reaction = mongoose.model("reactions", schema);
module.exports = Reaction;
