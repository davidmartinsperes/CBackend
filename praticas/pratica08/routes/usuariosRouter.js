const express = require("express");
const { gerarToken, verificarToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// Endpoint para login
router.post("/login", (req, res) => {
  const { email } = req.body;
  const token = gerarToken(email);
  return res.status(200).json({ token });
});

// Endpoint para renovar token
router.post("/renovar", verificarToken, (req, res) => {
  const { usuario } = req;
  const token = gerarToken(usuario.email);
  return res.status(200).json({ token });
});

module.exports = router;