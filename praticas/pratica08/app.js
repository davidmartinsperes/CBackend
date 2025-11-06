const express = require("express");
const { verificarToken } = require("./middlewares/authMiddleware");
const produtosRouter = require("./routes/produtosRouter");
const usuariosRouter = require("./routes/usuariosRouter");

const app = express();

app.use(express.json());

app.use("/usuarios", usuariosRouter);

app.use("/produtos", verificarToken, produtosRouter);

module.exports = app;
