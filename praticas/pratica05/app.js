const express = require("express");
const tarefasRouter = require("./routes/tarefaRouter");
const app = express();

app.use(express.json());
app.use("/tarefas", tarefasRouter);

app.listen(8080, () => {
  console.log("App está On!");
});

module.exports = app;