const crypto = require("crypto");

const sessions = new Map();
const COOKIE_NAME = "gta_session";

function createSession(user) {
    const token = crypto.randomBytes(32).toString("hex");
    sessions.set(token, user);
    return token;
}

function getSessionToken(req) {
    const cookies = req.headers.cookie || "";
    const cookie = cookies.split(";").find((item) => item.trim().startsWith(`${COOKIE_NAME}=`));
    return cookie ? cookie.trim().slice(`${COOKIE_NAME}=`.length) : null;
}

function attachUser(req, res, next) {
    const token = getSessionToken(req);
    req.user = token ? sessions.get(token) || null : null;
    req.sessionToken = token;
    next();
}

function setSessionCookie(res, token) {
    res.setHeader("Set-Cookie", `${COOKIE_NAME}=${token}; HttpOnly; SameSite=Lax; Path=/`);
}

function destroySession(req, res) {
    if (req.sessionToken) sessions.delete(req.sessionToken);
    res.setHeader("Set-Cookie", `${COOKIE_NAME}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`);
}

module.exports = { createSession, attachUser, setSessionCookie, destroySession };
