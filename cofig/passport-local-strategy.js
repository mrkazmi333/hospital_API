const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Doctor = require("../models/doctors");

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passReqToCallback: true,
    },
    function (request, username, password, done) {
      Doctor.findOne({ username: username }, function (err, doctor) {
        if (err) {
          console.log("Error in finding the doctor");
          request.info = "Internal Error";
          request.code = 500;
          return done(err);
        }
        if (!doctor || doctor.password != password) {
          console.log("Username/password not matched");
          request.code = 401;
          request.info = "Username/password not matched";
          return done(null, false);
        } else {
          console.log(doctor);
          request.code = 200;
          return done(null, doctor);
        }
      });
    }
  )
);

//Serualie the user t decide which key is to be used
passport.serializeUser(function (doctor, done) {
  done(null, doctor.id);
});

//Deserializing the user
passport.deserializeUser(function (id, done) {
  Doctor.findById(id, function (err, doctor) {
    if (err) {
      console.log("Error in finding user ---> Passport");
      return done(err);
    }
    return done(null, doctor);
  });
});

module.exports = passport;
