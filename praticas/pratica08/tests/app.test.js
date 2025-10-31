const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);
const url = "/produtos";

let token;
describe("Teste ", () => {
  test("GET /produtos deve retornar 401", async () => {
    const response = await request.get(url);

    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("Não Autorizado");
  });

  test("GET /produtos com token inválido deve retornar 401", async () => {
    const response = await request
      .get("/produtos")
      .set("authorization", "Bearer 123456789");

    expect(response.status).toBe(401);
    expect(response.body.msg).toBe("Token inválido");
  });

  test("POST /usuarios/login deve retornar 200", async () => {
    const response = await request.post("/usuarios/login").send({
      usuario: "david@gmail.com",
      senha: "abcd1234",
    });

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toHaveProperty("token");

    token = response.body.token;
  });

  test("GET /produtos com token válido deve retornar 200", async () => {
    const response = await request
      .get(url)
      .set("authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
  });

  test("POST /usuarios/renovar com token válido deve retornar 200", async () => {
    const response = await request
      .post("/usuarios/renovar")
      .set("authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body).toHaveProperty("token");

    token = response.body.token;
  });

  test("GET /produtos com novo token deve retornar 200", async () => {
    const response = await request
      .get(url)
      .set("authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
  });
});
