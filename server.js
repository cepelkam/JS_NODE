const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app", "views"));

const defaultRouter = require("./app/routes/defaultRouter");
const charactersRouter = require("./app/routes/charactersRouter");
const authRouter = require("./app/routes/authRouter");
const session = require("./app/middleware/session");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session.attachUser);

app.use("/", defaultRouter);
app.use("/", charactersRouter);
app.use("/", authRouter);

app.listen(PORT, () => {
    console.log(`Server běží na http://localhost:${PORT}`);
});
