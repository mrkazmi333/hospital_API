const express = require("express");
const router = express.Router();
const passport = require("passport");

const patientsAPI = require("../../../controllers/api/v1/patients_api");
const reportsAPI = require("../../../controllers/api/v1/reports_api");

router.post(
  "/register",
  passport.authenticate("jwt", { session: false }),
  patientsAPI.create
);
router.post(
  "/:id/create-report",
  passport.authenticate("jwt", { session: false }),
  patientsAPI.createReport
);

router.get("/:id/all-reports", patientsAPI.allReports);

module.exports = router;
