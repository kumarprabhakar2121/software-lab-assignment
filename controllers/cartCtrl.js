const Product = require("../model/Product");
const Cart = require("../model/Cart");
const User = require("../model/User");
const mongoose = require("mongoose");

const add = async (req, res, next) => {
  console.log(req.body);
  try {
    const { product_id, user_id, quantity } = req.body;
    if (
      !(
        product_id &&
        user_id &&
        mongoose.isValidObjectId(product_id) &&
        mongoose.isValidObjectId(user_id) &&
        quantity &&
        typeof quantity === "number" &&
        quantity > 0
      )
    ) {
      return res.json({
        success: false,
        msg: `Please enter product_id and user_id and quantity`,
      });
    }
    User.findById(user_id)
      .then(function (user) {
        if (!user) {
          return res.json({
            success: false,
            msg: "User not found",
          });
        }
      })
      .catch(function (err) {
        return res.json({
          success: false,
          msg: err.message,
          error: err,
        });
      });
    Product.findById(product_id)
      .then(function (product) {
        console.log({ product });
        if (!product) {
          return res.json({
            success: false,
            msg: "product not found",
          });
        }
      })
      .catch(function (err) {
        return res.json({
          success: false,
          msg: err.message,
          error: err,
        });
      });
    let price_of_single_item = await Product.findById(product_id);
    price_of_single_item = price_of_single_item.price;
    let total_amount = price_of_single_item * quantity;
    console.log({
      price_of_single_item,
      quantity,
      total_amount,
    });
    Cart.create({ product_id, total_amount, user_id, quantity })
      .then((data) => {
        res.json({
          success: true,
          msg: `Success! product added successfully to cart `,
          data,
        });
      })
      .catch((error) => {
        res.json({
          msg: "Error: " + error.message,
          error,
        });
      });
  } catch (error) {
    console.log(error);
    res.json({
      error,
    });
  }
};

const getList = (req, res, next) => {
  try {
    Cart.find({}, { __v: 0 })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ msg: err.message, error });
      });
  } catch (error) {
    res.json({ error });
  }
};

const getOne = (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.json({
        msg: "Invalid id provided",
      });
    }
    Cart.findById(id, { __v: 0 })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json({ msg: err.message, error });
      });
  } catch (error) {
    res.json({ error });
  }
};

const deleteOne = (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.json({
        msg: "Invalid id provided",
      });
    }
    Cart.findByIdAndDelete(id)
      .then((data) => {
        if (!data) {
          return res.json({ msg: "Cart not found" });
        }
        res.json({
          success: true,
          msg: "Cart deleted successfully",
          data,
        });
      })
      .catch((error) => {
        res.json({ msg: error.message, error });
      });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = {
  add,
  getList,
  getOne,
  deleteOne,
};
