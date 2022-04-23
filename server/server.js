// import express from "express";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import { createRequire } from "module";
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
// const require = createRequire(import.meta.url);
const passport = require("passport");
var LocalStrategy = require("passport-local");
const session = require("express-session");
// const express = require("express");

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
require("./controllers/passport");
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));
const authRouter = require("./routes/auth");
const entryRouter = require("./routes/entry");
app.use("/auth", authRouter);
app.use("/entries", entryRouter);
const PORT = process.env.PORT || 5000;
// console.log(process.env.CONNECTION_URL);
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
