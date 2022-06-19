require("dotenv").config();
require("./config/database").connect();
const logger = require("morgan");
const express = require("express");
const app = express();

app.use(express.json());
app.use(logger("dev"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

// importing routes
const userRoutes = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
app.use("/user", userRoutes);
app.use("/product", productRoute);
app.use("/cart", cartRoute);

app.post("/", (req, res) => {
  console.log(req)
  // const uu = JSON.parse(req.body
  // res.send(req.header);
});

module.exports = app;
