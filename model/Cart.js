const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    total_amount: {
      type: Number,
    },
    quantity: { type: Number },
    address: {
      type: String,
      required: true,
      default: "Main road,Ranchi,Jharkhand",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", CartSchema);
