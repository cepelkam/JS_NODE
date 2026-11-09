const express = require("express");
const charactersController = require("../controllers/charactersController");

const router = express.Router();

router.get("/characters", charactersController.showCharacters);
router.get("/api/characters", charactersController.getCharacters);
router.post("/api/characters", charactersController.addCharacter);
router.delete("/api/characters/:id", charactersController.deleteCharacter);

module.exports = router;
