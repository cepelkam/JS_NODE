const locationsModel = require("../models/locationsModel");

function showLocations(req, res) {
    res.render("locations", {
        title: "GTA V Hub – Lokace",
        locations: locationsModel.findAll(),
        user: req.user,
    });
}

module.exports = { showLocations };
