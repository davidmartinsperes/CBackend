require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const produtosRouter = require('./routes/produtosRouter');

const url = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`;

mongoose
  .connect(url)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.log("Erro ao conectar com MongoDB", err.message));

const app = express();

app.use(express.json());

app.use('/produtos', produtosRouter);

module.exports = app;