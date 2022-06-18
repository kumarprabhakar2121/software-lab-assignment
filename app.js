require("dotenv").config();
require("./config/database").connect();
const logger = require("morgan");
const express = require("express");
const app = express();
app.use(express.json());

app.use(logger("dev"));

app.get("/", (req, res) => {
  res.json({
    msg: "Home Route",
  });
});

module.exports = app;
