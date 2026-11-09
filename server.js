const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const defaultRouter = require("./app/routes/defaultRouter");
const charactersRouter = require("./app/routes/charactersRouter");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", defaultRouter);
app.use("/", charactersRouter);

app.listen(PORT, () => {
    console.log(`Server běží na http://localhost:${PORT}`);
});
