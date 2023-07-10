const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "books" },
    quantity: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CartItem", cartItemSchema);
