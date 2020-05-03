"use strict";function ownKeys(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,o)}return r}function _objectSpread(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?ownKeys(r,!0).forEach(function(e){_defineProperty(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):ownKeys(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var express=require("express"),multer=require("multer"),Recipe=require("../models/recipe"),checkAuth=require("../middleware/check-auth"),router=express.Router(),MIME_TYPE_MAP={"image/png":"png","image/jpg":"jpg","image/jpeg":"jpg"},storage=multer.diskStorage({destination:function(e,t,r){var o=MIME_TYPE_MAP[t.mimetype];new Error("invalid mime type");r(null,"backend/images")},filename:function(e,t,r){var o=t.originalname.toLowerCase().split(" ").join("-"),n=MIME_TYPE_MAP[t.mimetype];r(null,o+"-"+Date.now()+"."+n)}});router.post("",checkAuth,multer({storage:storage}).single("image"),function(e,t,r){var o=e.protocol+"://"+e.get("host");console.log(e.file);var n=new Recipe({title:e.body.title,description:e.body.description,isVegan:"true"===e.body.isVegan,imagePath:o+"/images/"+e.file.filename,creatorData:e.userData.userId});console.log("\nthis recipe will be added to db: "),console.log(n),n.save().then(function(e){t.status(201).json({message:"recipe added sucessfuly",recipe:_objectSpread({},e,{id:e._id})})})}),router.get("",function(e,t,r){Recipe.find().populate("creatorData").then(function(e){console.log("recipes fetcheddd!!! :)"),t.status(200).json({message:"recipes fetched succesfully :)",recipes:e})}).catch(function(e){console.log("could not fetch recipes!")})}),router.get("/:id",function(e,t,r){Recipe.findById(e.params.id).populate("creatorData").then(function(e){e?t.status(200).json(e):t.status(404).json({message:"recipe not found :("})})}),module.exports=router;