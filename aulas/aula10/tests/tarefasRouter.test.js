const supertest = require("supertest");

const app = require("../app");

const request = supertest(app);

const url = "/tarefas";

let id = null;

describe("Teste do recurso /tarefas", () => {
  test(" POST / deve retornar 201", async () => {
    const response = await request.post(url).send()({ nome: "Estudar" });
    expect(response.status).toBe(201);
    expect(response.body.id).toBe.Defined();
    id = response.body,id
  });

  test(" GET / deve retornar 200", async () => {
    const response = await request.get(url);
    expect(respoonse.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
});
  
  test(" GET /id deve retornar 200", async () => {
    const response = await request.get(`${url}/${id}}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
  });
  test(" PUT / deve retornar 200", async () => {
    const response = await request.put(`${url}/${id}`).send()({
      nome: "Estudar REST",
      concluida: true,
    });
    expect(response.status).toBe(200);
    expect(response.body.id).toBe.Defined();
  });
  test(" DELETE / deve retornar 204", async () => {
      const response = await request.delete(`${url}/${id}`);
      expect(response.status).toBe(204);
    });
  });