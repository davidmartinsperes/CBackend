const express = require('express');
const router = express.Router();

let store = [];

/* GET /produtos - lista todos os produtos */
router.get('/', (req, res) => {
  res.status(200).json(store);
});

/* POST /produtos - cria produto */
router.post('/', (req, res) => {
  const { nome, preco } = req.body || {};
  if (!nome || preco == null) {
    return res.status(422).json({ msg: 'Nome e preço são obrigatórios' });
  }
  const novo = { id: Date.now().toString(), nome, preco };
  store.push(novo);
  return res.status(201).json(novo);
});

/* GET /produtos/:produtoId - buscar por id */
router.get('/:produtoId', (req, res) => {
  const p = store.find(x => x.id === req.params.produtoId);
  if (!p) return res.status(404).json({ msg: 'Produto não encontrado' });
  return res.status(200).json(p);
});

/* PUT /produtos/:produtoId - atualizar */
router.put('/:produtoId', (req, res) => {
  const idx = store.findIndex(x => x.id === req.params.produtoId);
  if (idx === -1) return res.status(404).json({ msg: 'Produto não encontrado' });
  const { nome, preco } = req.body || {};
  if (!nome || preco == null) return res.status(422).json({ msg: 'Nome e preço são obrigatórios' });
  store[idx] = { id: req.params.produtoId, nome, preco };
  return res.status(200).json(store[idx]);
});

/* DELETE /produtos/:produtoId - remover */
router.delete('/:produtoId', (req, res) => {
  const idx = store.findIndex(x => x.id === req.params.produtoId);
  if (idx === -1) return res.status(404).json({ msg: 'Produto não encontrado' });
  store.splice(idx, 1);
  return res.status(204).end();
});

module.exports = router;