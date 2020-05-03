"use strict";

var path = require("path");

var express = require("express");

var bodyParser = require("body-parser");

var mongoose = require("mongoose");

var recipesRoutes = require("./routes/recipes");

var userRoutes = require("./routes/user");

var app = express(); // yE6AnuuySFvB07v2

mongoose.connect("mongodb+srv://wony:yE6AnuuySFvB07v2@cluster0-1eure.mongodb.net/test?retryWrites=true&w=majority").then(function () {
  console.log("connected to db! :)))");
}).catch(function () {
  console.log("failed to connect do db! :(");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use("/images", express.static(path.join("backend/images")));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT,  DELETE, OPTIONS");
  next();
});
app.use("/api/recipes", recipesRoutes);
app.use("/api/user", userRoutes);
module.exports = app;