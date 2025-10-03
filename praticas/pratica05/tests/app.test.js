const supertest = require("supertest");
const app = require("../app");
const request = supertest(app); 

let tarefaId;  

describe('GET /tarefas', () => {
  it('deve retornar um status 200 e um conteúdo JSON', async () => {
    const response = await request.get('/tarefas'); 
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});

describe('POST /tarefas', () => {
  it('deve retornar um status 201 e um conteúdo JSON com ID', async () => {
    const response = await request
      .post('/tarefas')
      .send({ nome: "Estudar Node", concluida: false });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    tarefaId = response.body.id;  
  });
});

describe('GET /tarefas/:id', () => {
  it('deve retornar a tarefa com o ID correto', async () => {
    const response = await request.get(`/tarefas/${tarefaId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', tarefaId);
  });

  it('deve retornar 404 para uma tarefa não encontrada', async () => {
    const response = await request.get('/tarefas/1');
    expect(response.status).toBe(404);
  });
});

describe('PUT /tarefas/:id', () => {
  it('deve atualizar a tarefa corretamente', async () => {
    const response = await request
      .put(`/tarefas/${tarefaId}`)
      .send({ nome: "Estudar Node e Express", concluida: true });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', tarefaId);
  });

  it('deve retornar 404 para atualizar tarefa inexistente', async () => {
    const response = await request.put('/tarefas/1').send({ nome: "Tarefa inexistente" });
    expect(response.status).toBe(404);
  });
});

describe('DELETE /tarefas/:id', () => {
  it('deve remover a tarefa corretamente', async () => {
    const response = await request.delete(`/tarefas/${tarefaId}`);
    expect(response.status).toBe(204);
  });

  it('deve retornar 404 para remover tarefa inexistente', async () => {
    const response = await request.delete('/tarefas/1');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ msg: "Tarefa não encontrada" });
  });
});


