const express = require("express");

const router = express.Router();
const passport = require("passport");

const doctorsAPI = require("../../../controllers/api/v1/doctors_api");

router.post("/register", doctorsAPI.create);
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/doctors/login" }),
  doctorsAPI.createSession
);

module.exports = router;
