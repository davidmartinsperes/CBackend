const express = require("express");
const { gerarToken, verificarToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", (req, res) => {
  const { usuario, senha } = req.body;
  
  // Validação simples - em produção deve usar banco de dados
  if (usuario === "david@gmail.com" && senha === "abcd1234") {
    const token = gerarToken(usuario);
    return res.status(200).json({ token });
  }
  
  return res.status(401).json({ msg: "Credenciais inválidas" });
});

router.post("/renovar", verificarToken, (req, res) => {
  const { usuario } = req;
  const token = gerarToken(usuario.email);
  return res.status(200).json({ token });
});

module.exports = router;