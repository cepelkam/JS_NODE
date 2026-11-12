const charactersModel = require("../models/charactersModel");

function showCharacters(req, res) {
    res.render("characters", {
        title: "GTA V Hub – Postavy",
        characters: charactersModel.findAll(),
    });
}

function getCharacters(req, res) {
    res.json(charactersModel.findAll());
}

function addCharacter(req, res) {
    const { name, role, description = "" } = req.body || {};

    if (typeof name !== "string" || !name.trim() || typeof role !== "string" || !role.trim()) {
        return res.status(400).json({ error: "Jméno a role jsou povinné." });
    }
    if (typeof description !== "string") {
        return res.status(400).json({ error: "Popis musí být text." });
    }

    const character = charactersModel.create({
        name: name.trim(),
        role: role.trim(),
        description: description.trim(),
    });
    return res.status(201).json(character);
}

function deleteCharacter(req, res) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({ error: "Neplatné ID postavy." });
    }
    if (!charactersModel.removeById(id)) {
        return res.status(404).json({ error: "Postava nebyla nalezena." });
    }
    return res.status(204).send();
}

module.exports = { showCharacters, getCharacters, addCharacter, deleteCharacter };
