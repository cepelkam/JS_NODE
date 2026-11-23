const crypto = require("crypto");
const db = require("../../db/database");

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
    const hash = crypto.scryptSync(password, salt, 64).toString("hex");
    return { hash, salt };
}

function create({ username, email, password }) {
    const { hash, salt } = hashPassword(password);
    const result = db.prepare(`
        INSERT INTO users (username, email, password_hash, password_salt)
        VALUES (?, ?, ?, ?)
    `).run(username, email, hash, salt);
    return { id: Number(result.lastInsertRowid), username, email };
}

function findByLogin(login) {
    return db.prepare(`
        SELECT id, username, email, password_hash, password_salt
        FROM users
        WHERE username = ? OR email = ?
    `).get(login, login);
}

function findById(id) {
    return db.prepare(`
        SELECT id, username, email, password_hash, password_salt
        FROM users
        WHERE id = ?
    `).get(id);
}

function verifyPassword(password, user) {
    const { hash } = hashPassword(password, user.password_salt);
    return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(user.password_hash, "hex"));
}

function removeById(id) {
    return db.prepare("DELETE FROM users WHERE id = ?").run(id).changes > 0;
}

module.exports = { create, findByLogin, findById, verifyPassword, removeById };
