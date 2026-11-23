const fs = require("fs");
const path = require("path");
const { DatabaseSync } = require("node:sqlite");

const dataDirectory = path.join(__dirname);
fs.mkdirSync(dataDirectory, { recursive: true });

const db = new DatabaseSync(path.join(dataDirectory, "gta-v.sqlite"));

db.exec(`
    CREATE TABLE IF NOT EXISTS characters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        description TEXT NOT NULL DEFAULT ''
    )
`);

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        password_salt TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
`);

const count = db.prepare("SELECT COUNT(*) AS count FROM characters").get().count;
if (count === 0) {
    const insert = db.prepare(
        "INSERT INTO characters (name, role, description) VALUES (?, ?, ?)"
    );
    insert.run("Michael De Santa", "Protagonista", "Bývalý bankovní lupič žijící v Los Santos.");
    insert.run("Franklin Clinton", "Protagonista", "Mladý řidič a člen Michaelovy party.");
    insert.run("Trevor Philips", "Protagonista", "Nepředvídatelný pilot a pašerák.");
}

module.exports = db;
