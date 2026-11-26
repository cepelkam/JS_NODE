const usersModel = require("../models/usersModel");
const charactersModel = require("../models/charactersModel");
const session = require("../middleware/session");

function renderRegister(req, res, error = null) {
    res.render("auth/register", { title: "Registrace", error, user: req.user });
}

function renderLogin(req, res, error = null) {
    res.render("auth/login", { title: "Přihlášení", error, user: req.user });
}

function showRegister(req, res) {
    renderRegister(req, res);
}

function register(req, res) {
    const username = typeof req.body.username === "string" ? req.body.username.trim() : "";
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const password = typeof req.body.password === "string" ? req.body.password : "";

    if (!username || !email || !password) return renderRegister(req, res, "Vyplň všechna pole.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return renderRegister(req, res, "Zadej platný e-mail.");
    if (password.length < 6) return renderRegister(req, res, "Heslo musí mít alespoň 6 znaků.");

    try {
        usersModel.create({ username, email, password });
    } catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return renderRegister(req, res, "Uživatelské jméno nebo e-mail už existuje.");
        }
        throw error;
    }
    return res.redirect("/login");
}

function showLogin(req, res) {
    renderLogin(req, res);
}

function login(req, res) {
    const loginValue = typeof req.body.login === "string" ? req.body.login.trim() : "";
    const password = typeof req.body.password === "string" ? req.body.password : "";
    const user = usersModel.findByLogin(loginValue);

    if (!user || !usersModel.verifyPassword(password, user)) {
        return renderLogin(req, res, "Neplatné přihlašovací údaje.");
    }

    const token = session.createSession({ id: user.id, username: user.username, email: user.email });
    session.setSessionCookie(res, token);
    return res.redirect("/characters");
}

function logout(req, res) {
    session.destroySession(req, res);
    return res.redirect("/");
}

function showAccount(req, res) {
    if (!req.user) return res.redirect("/login");
    res.render("auth/account", { title: "Můj účet", user: req.user, error: null });
}

function deleteAccount(req, res) {
    if (!req.user) return res.redirect("/login");

    const password = typeof req.body.password === "string" ? req.body.password : "";
    const user = usersModel.findById(req.user.id);

    if (!user || !usersModel.verifyPassword(password, user)) {
        return res.status(400).render("auth/account", {
            title: "Můj účet",
            user: req.user,
            error: "Heslo není správné. Účet nebyl smazán.",
        });
    }

    charactersModel.removeByOwnerId(req.user.id);
    usersModel.removeById(req.user.id);
    session.destroySession(req, res);
    return res.redirect("/");
}

module.exports = { showRegister, register, showLogin, login, logout, showAccount, deleteAccount };
