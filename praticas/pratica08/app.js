const express = require("express");
const mongoose = require("mongoose");
const produtosRouter = require("./routes/produtosRouter");
const usuariosRouter = require("./routes/usuariosRouter"); 

const app = express();

app.use(express.json());
app.use("/produtos", produtosRouter);
app.use("/usuarios", usuariosRouter);

module.exports = app;