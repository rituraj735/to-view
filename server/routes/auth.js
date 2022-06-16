const express = require("express");
const router = express.Router();
const passport = require("passport");
var LocalStrategy = require("passport-local");
var crypto = require("crypto");
const { loginUser, registerUser } = require("../controllers/auth");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

router.post("/register", registerUser);
module.exports = router;
