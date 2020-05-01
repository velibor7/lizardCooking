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
  } // ingredients : {type: String, required: true},
  // imagePath : {},
  // isVegan: { type: Boolean, default: false },
  // creatorData : {},

});
module.exports = mongoose.model("Recipe", recipeSchema);