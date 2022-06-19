const User = require("../model/User");

const signup = (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
      res.json({
        success: false,
        msg: "Please enter your name and email address and password ",
      });
    }

    User.create({ name, email, password })
      .then((data) => {
        res.json({
          success: true,
          msg: "Success! You have signup successfully! ",
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

const login = (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.json({
        success: false,
        msg: "Enter your email address and password",
      });
    }

    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res.json({ success: true, msg: "email not found" });
        }
        if (user.password === password) {
          res.json({ success: true, msg: "successfully login" });
        } else {
          res.json({ success: false, msg: "wrong password" });
        }
      })
      .catch((error) => {
        res.json({ msg: error.message, error });
      });
  } catch (error) {
    res.json({ error });
  }
};

const users = (req, res, next) => {
  try {
    User.find({}, { __v: 0 })
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.json({ msg: err.message, error });
      });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = {
  signup,
  login,
  users,
};
