const supertest = require("supertest");
const app = require("../app");

const request = supertest(app);

let id = "";
let token = "";

describe("Testes do recurso /usuarios", () => {

  test("POST /usuarios cria usuário", async () => {
    const res = await request.post("/usuarios").send({
      email: "usuario@email.com",
      senha: "abcd1234"
    });

    expect(res.status).toBe(201);
    expect(res.body._id).toBeDefined();
    expect(res.body.email).toBe("usuario@email.com");

    id = res.body._id;
  });

  test("POST /usuarios sem body → 422", async () => {
    const res = await request.post("/usuarios").send({});
    expect(res.status).toBe(422);
    expect(res.body.msg).toBe("Email e Senha são obrigatórios");
  });

  test("POST /usuarios/login retorna token", async () => {
    const res = await request.post("/usuarios/login").send({
      usuario: "usuario@email.com",
      senha: "abcd1234"
    });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();

    token = res.body.token;
  });

  test("POST /usuarios/login sem body → 401", async () => {
    const res = await request.post("/usuarios/login").send({});
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe("Credenciais inválidas");
  });

  test("POST /usuarios/renovar com token válido", async () => {
    const res = await request.post("/usuarios/renovar")
      .set("authorization", token);

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test("POST /usuarios/renovar token inválido", async () => {
    const res = await request.post("/usuarios/renovar")
      .set("authorization", "Bearer 123456789");

    expect(res.status).toBe(401);
    expect(res.body.msg).toBe("Token inválido");
  });

  test("DELETE /usuarios/:id retorna 204", async () => {
    const res = await request.delete(`/usuarios/${id}`)
      .set("authorization", token);

    expect(res.status).toBe(204);
  });

});
