const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartScheme = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    qty: {
      type: Number,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user id"],
      unique: false,
    },
    pid: {
      type: mongoose.Types.ObjectId,
      required: [true, "Please provide pid"],
      // unique: [true, "Product is already in the cart"],
      unique: false,
    },
  },
  { timestamps: true }
);
cartScheme.index({ pid: 1, createdBy: 1 }, { unique: true });

const Cart = mongoose.model("Cart", cartScheme);

module.exports = Cart;
