const express = require("express");

const router = express.Router();
const passport = require("passport");

const reportsAPI = require("../../../controllers/api/v1/reports_api");

router.get(
  "/:status",
  passport.authenticate("jwt", { session: false }),
  reportsAPI.allReportsByStatus
);

module.exports = router;
