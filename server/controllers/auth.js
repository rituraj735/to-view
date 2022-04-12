const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const validator = require("validator");

const registerUser = async (req, res) => {
  const { displayName, email, password } = req.body;
  console.log(`${displayName} ${email} ${password}`);
  if (!password || password.length < 6) {
    return res
      .status(400)
      .send({ error: "Password needso be 6 characters long" });
  }

  if (!email || !validator.isEmail(email)) {
    return res.status(400).send({ error: "Enter valid email" });
  }

  User.findOne({ email: email }).exec((err, user) => {
    console.log(user);
    if (user) {
      return res.status(400).send({ error: "An account already exists" });
    } else {
      const newUser = new User({ displayName, email, password });
      console.log(newUser.password);
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              return res.status(200).send("success");
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
    }
  });
};

module.exports = { registerUser };
