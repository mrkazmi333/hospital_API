const express = require("express");

const router = express.Router();
const passport = require("passport");

const reportsAPI = require("../../../controllers/api/v1/reports_api");

router.get("/:status", reportsAPI.allReportsByStatus);

module.exports = router;
