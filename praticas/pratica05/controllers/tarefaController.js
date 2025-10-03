const tarefaModel = require('../models/tarefaModel'); 


const listar = (req, res) => {
  const tarefas = tarefaModel.listar();
  res.json(tarefas);
};


const buscarPeloId = (req, res) => {
  const tarefaId = req.params.tarefaId;
  const tarefa = tarefaModel.buscarPeloId(tarefaId);
  if (tarefa) {
    return res.json(tarefa);
  }
  res.status(404).json({ msg: "Tarefa não encontrada" });
};


const criar = (req, res) => {
  const tarefa = req.body;
  const novaTarefa = tarefaModel.criar(tarefa);
  res.status(201).json(novaTarefa);
};


const atualizar = (req, res) => {
  const tarefaId = req.params.tarefaId;
  const dadosAtualizados = req.body;
  const tarefaAtualizada = tarefaModel.atualizar(tarefaId, dadosAtualizados);
  if (tarefaAtualizada) {
    return res.json(tarefaAtualizada);
  }
  res.status(404).json({ msg: "Tarefa não encontrada" });
};


const remover = (req, res) => {
  const tarefaId = req.params.tarefaId;
  const tarefaRemovida = tarefaModel.remover(tarefaId);
  if (tarefaRemovida) {
    return res.status(204).send();
  }
  res.status(404).json({ msg: "Tarefa não encontrada" });
};

module.exports = { listar, buscarPeloId, criar, atualizar, remover };