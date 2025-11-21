require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const apidocsRouter = require("./routes/apidocsRouter");
const usuariosRouter = require("./routes/usuariosRouter");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_DATABASE } = process.env;

const connString = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DATABASE}`;
mongoose.connect(connString)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => {
    console.error("Erro ao conectar no MongoDB:", err.message || err);
  });

app.use("/api-docs", apidocsRouter);
app.use("/usuarios", usuariosRouter);

module.exports = app;
