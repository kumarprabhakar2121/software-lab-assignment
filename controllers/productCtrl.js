const Product = require("../model/Product");
const mongoose = require("mongoose");
const add = (req, res, next) => {
  try {
    const { product_name, price } = req.body;
    if (!(product_name && price)) {
      res.json({
        success: false,
        msg: "Please enter product_name and price  ",
      });
    }

    Product.create({ product_name, price })
      .then((data) => {
        res.json({
          success: true,
          msg: "Success! Product created successfully",
        });
      })
      .catch((error) => {
        res.json({
          msg: "Error: " + error.message,
          error,
        });
      });
  } catch (error) {
    res.json({
      error,
    });
  }
};

const getList = (req, res, next) => {
  try {
    Product.find({}, { __v: 0 })
      .then((products) => {
        res.json(products);
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
    Product.findById(id, { __v: 0 })
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

const update = (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.json({
        msg: "Invalid id provided",
      });
    }
    Product.findByIdAndUpdate(id, { $set: req.body }, { new: true })
      .then((data) => {
        if (!data) {
          return res.json({ msg: "Product not found" });
        }
        res.json({
          success: true,
          msg: "Product updated successfully",
          data,
        });
      })
      .catch((err) => {
        res.json({ msg: err.message, error: err });
      });
  } catch (error) {
    console.log(error);
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
    Product.findByIdAndDelete(id)
      .then((data) => {
        if (!data) {
          return res.json({ msg: "Product not found" });
        }
        res.json({
          success: true,
          msg: "Product deleted successfully",
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
  update,
  deleteOne,
};
