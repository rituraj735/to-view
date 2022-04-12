const express = require("express");
const router = express.Router();
const passport = require("passport");
var LocalStrategy = require("passport-local");
var crypto = require("crypto");
const { loginUser, registerUser } = require("../controllers/auth");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/t",
    failureRedirect: "/c",
  })(req, res, next);
});

router.post("/register", registerUser);
module.exports = router;
