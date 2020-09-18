const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;

const ExtractJWT = require("passport-jwt").ExtractJwt;

const Doctor = require("../models/doctors");

// extracting the token from header
let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "hospital",
};

passport.use(
  new JWTStrategy(opts, function (jwtPayLoad, done) {
    Doctor.findById(jwtPayLoad._id, function (err, doctor) {
      if (err) {
        console.log("Error in finding Doctor from JWT", err);
        return;
      }
      if (doctor) {
        return done(null, doctor);
      } else return done(null, false);
    });
  })
);

module.exports = passport;
