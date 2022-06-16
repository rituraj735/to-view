const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const validator = require("validator");

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    console.log("login is being processed");

    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          return done(null, false, {
            message: `No user found with email ${email}`,
          });
        } else {
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Wrong password" });
            }
          });
        }
      })
      .catch((err) => {
        return done(null, false, { message: err });
      });
  })
);
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById({ _id: id }, (err, user) => {
    cb(err, user);
  });
});
