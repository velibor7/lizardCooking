const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const recipesRoutes = require("./routes/recipes");
// const userRoutes = require("./routes/user");

const app = express();
// yE6AnuuySFvB07v2

mongoose
  .connect(
    "mongodb+srv://wony:yE6AnuuySFvB07v2@cluster0-1eure.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to db! :)))");
  })
  .catch(() => {
    console.log("failed to connect do db! :(");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT,  DELETE, OPTIONS"
  );
  next();
});

app.use("/api/recipes", recipesRoutes);
// app.use("/api/user", userRoutes);

module.exports = app;
