"use strict";var mongoose=require("mongoose"),recipeSchema=mongoose.Schema({title:{type:String,required:!0},description:{type:String,required:!0},imagePath:{type:String,default:""},isVegan:{type:Boolean,default:!1}});module.exports=mongoose.model("Recipe",recipeSchema);