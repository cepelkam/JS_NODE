const db = require("../../db/database");

function findAll(userId) {
    return db
        .prepare(`
            SELECT c.id, c.name, c.role, c.description, c.user_id AS userId,
                   COALESCE(u.username, 'Systém') AS author
            FROM characters c
            LEFT JOIN users u ON u.id = c.user_id
            WHERE c.user_id IS NULL OR c.user_id = ?
            ORDER BY c.id
        `)
        .all(userId || 0);
}

function create({ name, role, description, userId }) {
    const result = db
        .prepare("INSERT INTO characters (name, role, description, user_id) VALUES (?, ?, ?, ?)")
        .run(name, role, description, userId);
    return db
        .prepare(`
            SELECT c.id, c.name, c.role, c.description, c.user_id AS userId,
                   u.username AS author
            FROM characters c
            LEFT JOIN users u ON u.id = c.user_id
            WHERE c.id = ?
        `)
        .get(result.lastInsertRowid);
}

function findByIdForUser(id, userId) {
    return db.prepare(`
        SELECT c.id, c.name, c.role, c.description, c.user_id AS userId,
               u.username AS author
        FROM characters c
        LEFT JOIN users u ON u.id = c.user_id
        WHERE c.id = ? AND c.user_id = ?
    `).get(id, userId);
}

function updateById(id, userId, { name, role, description }) {
    return db.prepare(`
        UPDATE characters
        SET name = ?, role = ?, description = ?
        WHERE id = ? AND user_id = ?
    `).run(name, role, description, id, userId).changes > 0;
}

function removeById(id, userId) {
    return db.prepare("DELETE FROM characters WHERE id = ? AND user_id = ?").run(id, userId).changes > 0;
}

function removeByOwnerId(userId) {
    db.prepare("DELETE FROM characters WHERE user_id = ?").run(userId);
}

module.exports = { findAll, create, findByIdForUser, updateById, removeById, removeByOwnerId };
