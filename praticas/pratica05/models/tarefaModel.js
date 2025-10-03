const tarefas = [];  


const listar = () => tarefas;


const buscarPeloId = (tarefaId) => {
  return tarefas.find(tarefa => tarefa.id === tarefaId);
};

const criar = (tarefa) => {
  const id = Math.random().toString(36).substr(2, 4);  
  const novaTarefa = { id, ...tarefa };
  tarefas.push(novaTarefa);
  return novaTarefa;
};


const atualizar = (tarefaId, dadosAtualizados) => {
  const tarefaIndex = tarefas.findIndex(tarefa => tarefa.id === tarefaId);
  if (tarefaIndex !== -1) {
    tarefas[tarefaIndex] = { ...tarefas[tarefaIndex], ...dadosAtualizados };
    return tarefas[tarefaIndex];
  }
  return null;
};


const remover = (tarefaId) => {
  const tarefaIndex = tarefas.findIndex(tarefa => tarefa.id === tarefaId);
  if (tarefaIndex !== -1) {
    return tarefas.splice(tarefaIndex, 1)[0];
  }
  return null;
};

module.exports = { listar, buscarPeloId, criar, atualizar, remover };