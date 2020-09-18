const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/hospital_api_1");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Databse:: MongoDB");
});

module.exports = db;
