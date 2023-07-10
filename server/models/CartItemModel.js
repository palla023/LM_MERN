
const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "books" },
  quantity: { type: Number, default: 1 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

module.exports = mongoose.model("CartItem", cartItemSchema);
 