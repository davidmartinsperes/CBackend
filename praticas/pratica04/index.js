const express = require("express");
const app = express();

app.use(express.json());

const tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true },
];

//mid de aplicação
app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

const router = express.Router();
app.use("/tarefas", router);

router.get("/", (req, res) => {
  res.send(tarefas);
});

router.post("/", (req, res) => {
  const novaTarefa = {
    id: tarefas.length + 1,
    ...req.body,
  };
  tarefas.push(novaTarefa);
  res.status(201).send(novaTarefa);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const tarefa = tarefas.find((item) => item.id == id);

  if (tarefa) return res.send(tarefa);
  throw Error("Tarefa não encontrada");
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const tarefa = tarefas.find((item) => item.id == id);

  if (tarefa) {
    tarefa.nome = req.body.nome;
    tarefa.concluida = req.body.concluida;
    return res.send(tarefa);
    
  }
  throw Error("Tarefa não encontrada");
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const posicao = tarefas.findIndex((item) => item.id == id);
  if (posicao >= 0) {
    tarefas.splice(posicao, 1);
  }
  throw Error("Tarefa não encontrada");
});

app.use((err, req, res, next) => {
  res.status(400).send(err.message);
});


app.listen(8080, () => {
  console.log("App está On!");
});

module.exports = app;
