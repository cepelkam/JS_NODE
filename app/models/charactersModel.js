const db = require("../../db/database");

const characterImages = {
    "Michael De Santa": "https://m.thegtaplace.com/images/gtav/artwork/v_michael4.jpg",
    "Franklin Clinton": "https://m.thegtaplace.com/images/gtav/artwork/v_franklin4.jpg",
    "Trevor Philips": "https://m.thegtaplace.com/images/gtav/artwork/v_trevor3.jpg",
};

function addImages(characters) {
    return characters.map((character) => ({
        ...character,
        image: characterImages[character.name] || null,
    }));
}

function findAll(userId) {
    return addImages(db
        .prepare(`
            SELECT c.id, c.name, c.role, c.description, c.user_id AS userId,
                   COALESCE(u.username, 'Systém') AS author
            FROM characters c
            LEFT JOIN users u ON u.id = c.user_id
            WHERE c.user_id IS NULL OR c.user_id = ?
            ORDER BY c.id
        `)
        .all(userId || 0));
}

function findByOwnerId(userId) {
    return addImages(db
        .prepare(`
            SELECT c.id, c.name, c.role, c.description, c.user_id AS userId,
                   u.username AS author
            FROM characters c
            LEFT JOIN users u ON u.id = c.user_id
            WHERE c.user_id = ?
            ORDER BY c.id DESC
        `)
        .all(userId));
}

function create({ name, role, description, userId }) {
    const result = db
        .prepare("INSERT INTO characters (name, role, description, user_id) VALUES (?, ?, ?, ?)")
        .run(name, role, description, userId);
    return {
        ...db
        .prepare(`
            SELECT c.id, c.name, c.role, c.description, c.user_id AS userId,
                   u.username AS author
            FROM characters c
            LEFT JOIN users u ON u.id = c.user_id
            WHERE c.id = ?
        `)
        .get(result.lastInsertRowid),
        image: characterImages[name] || null,
    };
}

function findByIdForUser(id, userId) {
    const character = db.prepare(`
        SELECT c.id, c.name, c.role, c.description, c.user_id AS userId,
               u.username AS author
        FROM characters c
        LEFT JOIN users u ON u.id = c.user_id
        WHERE c.id = ? AND c.user_id = ?
    `).get(id, userId);
    return character ? { ...character, image: characterImages[character.name] || null } : null;
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

module.exports = { findAll, findByOwnerId, create, findByIdForUser, updateById, removeById, removeByOwnerId };
