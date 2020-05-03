const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

//* api/user/signup
router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hash,
    });
    console.log("this user is created: ");
    console.log(user);
    user
      .save()
      .then((result) => {
        res.status(201).json({ message: "user created1", result: result });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  });
});

//* api/user/login
router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "auth failed" });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({ message: "auth failed!" });
      }
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id,
        },
        "secret_hehe",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        email: fetchedUser.email,
      });
    })
    .catch((err) => {
      return res.status(401).json({ message: "auth failed in catch block!" });
    });
});

module.exports = router;
