const express = require("express");
const locationsController = require("../controllers/locationsController");

const router = express.Router();

router.get("/locations", locationsController.showLocations);

module.exports = router;
