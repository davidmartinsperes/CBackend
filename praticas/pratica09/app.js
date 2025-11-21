const express = require("express");
const path = require("path");
const logger = require("morgan");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const apidocsRouter = require("./routes/apidocsRouter");
app.use("/api-docs", apidocsRouter);

module.exports = app;