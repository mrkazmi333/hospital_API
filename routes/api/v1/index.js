const express = require("express");

const router = express.Router();

router.use("/doctors", require("./doctors"));
router.use("/patients", require("./pateints"));
router.use("/reports", require("./reports"));

module.exports = router;
