const mongoose = require('mongoose');
const Produto = require('../models/produtosModel');

async function criar(req, res) {
  try {
    const { nome, preco } = req.body;
    const novoProduto = await Produto.create({ nome, preco });
    return res.status(201).json(novoProduto);
  } catch (err) {
    return res.status(422).json({ msg: 'Nome e preço do produto são obrigatórios' });
  }
}

async function listar(req, res) {
  const produtosCadastrados = await Produto.find({});
  return res.status(200).json(produtosCadastrados);
}

async function buscar(req, res, next) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'Parâmetro inválido' });
  }

  const produtoEncontrado = await Produto.findOne({ _id: id });
  if (produtoEncontrado) {
    req.produto = produtoEncontrado;
    return next();
  } else {
    return res.status(404).json({ msg: 'Produto não encontrado' });
  }
}

function exibir(req, res) {
  return res.status(200).json(req.produto);
}

async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const { nome, preco } = req.body;

    await Produto.updateOne({ _id: id }, { nome, preco });

    const produtoAtualizado = { _id: id, nome, preco };
    return res.status(200).json(produtoAtualizado);
  } catch (err) {
    return res.status(422).json({ msg: 'Nome e preço do produto são obrigatórios' });
  }
}

async function remover(req, res) {
  const { id } = req.params;
  const produtoRemovido = await Produto.findOneAndDelete({ _id: id });
  return res.status(204).end();
}

module.exports = {
  criar,
  listar,
  buscar,
  exibir,
  atualizar,
  remover,
};