const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

const router = require("./routes/router");

app.use(express.static(path.join(__dirname, "public")));

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server běží na http://localhost:${PORT}`);
});