const express = require("express");
// const multer = require("multer");

const Recipe = require("../models/recipe");
// const checkAuth = require("../middleware/check-auth");

const router = express.Router();

/*
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("invalid mime type");
    if (isValid) {
      error = null;
    }
    // relative to server.js file
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    //! we gotta change this to better way of saving
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});
*/

//* create recipe
router.post(
  "",
  // checkAuth,
  // multer({ storage: storage }).single("image"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    // console.log(req);
    const recipe = new Recipe({
      title: req.body.title,
      description: req.body.description,
      isVegan: req.body.isVegan === "true",
    });
    console.log("\nthis recipe will be added to db: ");
    console.log(recipe);
    recipe.save().then((createdRecipe) => {
      res.status(201).json({
        message: "recipe added sucessfuly",
        recipe: {
          ...createdRecipe,
          id: createdRecipe._id,
        },
      });
    });
  }
);

/*
//* update post
router.put(
  "/:id",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const post = new Post({
      _id: req.body.id,
      content: req.body.content,
      imagePath: imagePath,
      creatorData: req.userData.userId, //! ?!?!
    });
    // console.log(post);
    Post.updateOne(
      { _id: req.params.id, creatorData: req.userData.userId },
      post
    ).then((result) => {
      if (result.n > 0) {
        res.status(200).json({ message: "post updated :)" });
      } else {
        res.status(401).json({ message: "not auth!" });
      }
    });
  }
);
*/

//* fetching all recipes
router.get("", (req, res, next) => {
  Recipe.find()
    // .populate("creatorData")
    .then((documents) => {
      // console.log(documents);
      console.log("recipes fetcheddd!!! :)");
      //! async
      res.status(200).json({
        message: "recipes fetched succesfully :)",
        recipes: documents,
      });
    })
    .catch((err) => {
      console.log("could not fetch recipes!");
    });
});

//* fetching single recipe
router.get("/:id", (req, res, next) => {
  Recipe.findById(req.params.id)
    // .populate("creatorData") //! idk for this too
    .then((recipe) => {
      if (recipe) {
        res.status(200).json(recipe);
      } else {
        res.status(404).json({ message: "recipe not found :(" });
      }
    });
});

/*
//* deleting single post
router.delete("/:id", checkAuth, (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creatorData: req.userData.userId })
    .then((result) => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "post deleted! :)" });
      } else {
        res.status(401).json({ message: "not auth" });
      }
    })
    .catch((err) => {
      res.status(404).json({ message: "an error occured", error: err });
    });
});

*/
module.exports = router;
