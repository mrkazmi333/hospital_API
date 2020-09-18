const express = require("express");
const app = express();

const port = 8000;

app.use(express.urlencoded());

const db = require("./cofig/mongoose");

const passport = require("passport");
const passportLocal = require("./cofig/passport-local-strategy");
const passportJWT = require("./cofig/passport-jwt-strategy");

app.use(passport.initialize());

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;
