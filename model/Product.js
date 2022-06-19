const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
