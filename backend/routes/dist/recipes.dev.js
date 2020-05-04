"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require("express");

var multer = require("multer");

var Recipe = require("../models/recipe");

var checkAuth = require("../middleware/check-auth");

var router = express.Router();
var MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpg"
};
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    //console.log("FILEE:");
    //console.log(file);
    var isValid = MIME_TYPE_MAP[file.mimetype];
    var error = new Error("invalid mime type");

    if (isValid) {
      error = null;
    } // relative to server.js file


    cb(null, "backend/images");
  },
  filename: function filename(req, file, cb) {
    //! we gotta change this to better way of saving
    var name = file.originalname.toLowerCase().split(" ").join("-");
    var ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
}); //* create recipe

router.post("", checkAuth, multer({
  storage: storage
}).single("image"), function (req, res, next) {
  var url = req.protocol + "://" + req.get("host");
  console.log(req.file);
  var recipe = new Recipe({
    title: req.body.title,
    description: req.body.description,
    isVegan: req.body.isVegan === "true",
    imagePath: url + "/images/" + req.file.filename,
    creatorData: req.userData.userId
  });
  console.log("\nthis recipe will be added to db: ");
  console.log(recipe);
  recipe.save().then(function (createdRecipe) {
    res.status(201).json({
      message: "recipe added sucessfuly",
      recipe: _objectSpread({}, createdRecipe, {
        id: createdRecipe._id
      })
    });
  });
}); //* update post

router.put("/:id", checkAuth, multer({
  storage: storage
}).single("image"), function (req, res, next) {
  console.log(req);
  var imagePath = req.body.imagePath;

  if (req.file) {
    var url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }

  console.log("s================");
  var recipe = new Recipe({
    _id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    imagePath: imagePath,
    isVegan: req.body.isVegan,
    creatorData: req.userData.userId //! this comes out of checkAuth middleware

  });
  Recipe.updateOne({
    _id: req.params.id,
    creatorData: req.userData.userId
  }, recipe).then(function (result) {
    console.log(result);

    if (result.n > 0) {
      res.status(200).json({
        message: "post updated :)"
      });
    } else {
      console.log("not auth");
      res.status(401).json({
        message: "not auth!"
      });
    }
  });
}); //* fetching all recipes

router.get("", function (req, res, next) {
  Recipe.find().populate("creatorData").then(function (documents) {
    // console.log(documents);
    console.log("recipes fetcheddd!!! :)"); //! async

    res.status(200).json({
      message: "recipes fetched succesfully :)",
      recipes: documents
    });
  }).catch(function (err) {
    console.log("could not fetch recipes!");
  });
}); //* fetching single recipe

router.get("/:id", function (req, res, next) {
  Recipe.findById(req.params.id).populate("creatorData") //! idk for this too
  .then(function (recipe) {
    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({
        message: "recipe not found :("
      });
    }
  });
}); //* deleting single post

router.delete("/:id", checkAuth, function (req, res, next) {
  // console.log("idk?");
  Recipe.deleteOne({
    _id: req.params.id,
    creatorData: req.userData.userId
  }).then(function (result) {
    // console.log(result);
    if (result.n > 0) {
      res.status(200).json({
        message: "recipe deleted! :)"
      });
      console.log("recipe deleted!");
    } else {
      res.status(401).json({
        message: "not auth"
      });
    }
  }).catch(function (err) {
    console.log(err);
    res.status(404).json({
      message: "an error occured",
      error: err
    });
  });
});
module.exports = router;