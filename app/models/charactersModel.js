const db = require("../../db/database");

function findAll() {
    return db
        .prepare("SELECT id, name, role, description FROM characters ORDER BY id")
        .all();
}

function create({ name, role, description }) {
    const result = db
        .prepare("INSERT INTO characters (name, role, description) VALUES (?, ?, ?)")
        .run(name, role, description);
    return db
        .prepare("SELECT id, name, role, description FROM characters WHERE id = ?")
        .get(result.lastInsertRowid);
}

function removeById(id) {
    return db.prepare("DELETE FROM characters WHERE id = ?").run(id).changes > 0;
}

module.exports = { findAll, create, removeById };
