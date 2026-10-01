const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile("index.html", { root: "public" });
});

router.get("/test", (req, res) => {
    res.send("Router funguje!");
});

module.exports = router;