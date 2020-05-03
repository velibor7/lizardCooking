"use strict";

var mongoose = require("mongoose");

var uniqueValidator = require("mongoose-unique-validator");

var userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);