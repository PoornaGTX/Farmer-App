const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productScheme = new Schema(
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
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productScheme);

module.exports = Product;
