const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  // ingredients : {type: String, required: true},
  imagePath: { type: String, default: "" },
  isVegan: { type: Boolean, default: false },
  // creatorData : {},
});

module.exports = mongoose.model("Recipe", recipeSchema);
