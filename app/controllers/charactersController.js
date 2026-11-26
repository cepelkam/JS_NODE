const charactersModel = require("../models/charactersModel");

function showCharacters(req, res) {
    res.render("characters", {
        title: "GTA V Hub – Postavy",
        characters: charactersModel.findAll(req.user?.id),
        user: req.user,
    });
}

function getCharacters(req, res) {
    res.json(charactersModel.findAll(req.user?.id));
}

function addCharacter(req, res) {
    if (!req.user) return res.status(401).json({ error: "Pro přidání postavy se musíš přihlásit." });
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
        userId: req.user.id,
    });
    return res.status(201).json(character);
}

function deleteCharacter(req, res) {
    if (!req.user) return res.status(401).json({ error: "Pro smazání postavy se musíš přihlásit." });
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({ error: "Neplatné ID postavy." });
    }
    if (!charactersModel.removeById(id, req.user.id)) {
        return res.status(404).json({ error: "Postava nebyla nalezena." });
    }
    return res.status(204).send();
}

function showEditCharacter(req, res) {
    if (!req.user) return res.redirect("/login");
    const id = Number(req.params.id);
    const character = charactersModel.findByIdForUser(id, req.user.id);
    if (!character) return res.status(404).send("Postava nebyla nalezena.");
    return res.render("characters/edit", { title: "Upravit postavu", user: req.user, character, error: null });
}

function updateCharacter(req, res) {
    if (!req.user) return res.redirect("/login");
    const id = Number(req.params.id);
    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
    const role = typeof req.body.role === "string" ? req.body.role.trim() : "";
    const description = typeof req.body.description === "string" ? req.body.description.trim() : "";
    const character = charactersModel.findByIdForUser(id, req.user.id);

    if (!character) return res.status(404).send("Postava nebyla nalezena.");
    if (!name || !role) {
        return res.status(400).render("characters/edit", {
            title: "Upravit postavu", user: req.user,
            character: { ...character, name, role, description },
            error: "Jméno a role jsou povinné.",
        });
    }

    charactersModel.updateById(id, req.user.id, { name, role, description });
    return res.redirect("/characters");
}

module.exports = {
    showCharacters, getCharacters, addCharacter, deleteCharacter,
    showEditCharacter, updateCharacter,
};
