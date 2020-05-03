"use strict";

var mongoose = require("mongoose");

var recipeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // ingredients : {type: String, required: true},
  imagePath: {
    type: String,
    default: ""
  },
  isVegan: {
    type: Boolean,
    default: false
  },
  creatorData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});
module.exports = mongoose.model("Recipe", recipeSchema);