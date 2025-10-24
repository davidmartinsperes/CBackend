const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);

describe('/produtos', () => {
  let createdId;

  test('POST /produtos - cria produto e retorna 201 JSON com _id, nome e preco', async () => {
    const res = await request
      .post('/produtos')
      .send({ nome: 'Laranja', preco: 10.0 })
      .set('Accept', 'application/json');

    expect(res.status).toBe(201);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('_id');
    createdId = res.body._id;
    expect(res.body.nome).toBe('Laranja');
    expect(Number(res.body.preco)).toBeCloseTo(10.0);
  });

  test('POST /produtos sem JSON - retorna 422 com msg de erro', async () => {
    const res = await request
      .post('/produtos')
      .send()
      .set('Accept', 'application/json');

    expect(res.status).toBe(422);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
  });

  test('GET /produtos - retorna 200 JSON com array', async () => {
    const res = await request.get('/produtos').set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /produtos/:id - retorna 200 JSON com produto criado', async () => {
    const res = await request.get(`/produtos/${createdId}`).set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('_id', createdId);
    expect(res.body).toHaveProperty('nome', 'Laranja');
    expect(Number(res.body.preco)).toBeCloseTo(10.0);
  });

  test('GET /produtos/0 - retorna 400 com msg "Parâmetro inválido"', async () => {
    const res = await request.get('/produtos/0').set('Accept', 'application/json');

    expect(res.status).toBe(400);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  test('GET /produtos/000000000000000000000000 - retorna 404 com msg "Produto não encontrado"', async () => {
    const res = await request
      .get('/produtos/000000000000000000000000')
      .set('Accept', 'application/json');

    expect(res.status).toBe(404);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Produto não encontrado');
  });

  test('PUT /produtos/:id - atualiza e retorna 200 JSON com valores atualizados', async () => {
    const res = await request
      .put(`/produtos/${createdId}`)
      .send({ nome: 'Laranja Pera', preco: 18.0 })
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('_id', createdId);
    expect(res.body).toHaveProperty('nome', 'Laranja Pera');
    expect(Number(res.body.preco)).toBeCloseTo(18.0);
  });

  test('PUT /produtos/:id sem JSON - retorna 422 com msg de erro', async () => {
    const res = await request
      .put(`/produtos/${createdId}`)
      .send()
      .set('Accept', 'application/json');

    expect(res.status).toBe(422);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Nome e preço do produto são obrigatórios');
  });

  test('PUT /produtos/0 - retorna 400 com msg "Parâmetro inválido"', async () => {
    const res = await request
      .put('/produtos/0')
      .send({ nome: 'X', preco: 1 })
      .set('Accept', 'application/json');

    expect(res.status).toBe(400);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  test('PUT /produtos/000000000000000000000000 - retorna 404 com msg "Produto não encontrado"', async () => {
    const res = await request
      .put('/produtos/000000000000000000000000')
      .send({ nome: 'X', preco: 1 })
      .set('Accept', 'application/json');

    expect(res.status).toBe(404);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Produto não encontrado');
  });

  test('DELETE /produtos/:id - retorna 204 sem conteúdo', async () => {
    const res = await request.delete(`/produtos/${createdId}`).set('Accept', 'application/json');

    expect(res.status).toBe(204);
    expect(res.text).toBe('');
  });

  test('DELETE /produtos/0 - retorna 400 com msg "Parâmetro inválido"', async () => {
    const res = await request.delete('/produtos/0').set('Accept', 'application/json');

    expect(res.status).toBe(400);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Parâmetro inválido');
  });

  test('DELETE /produtos/:id novamente - retorna 404 com msg "Produto não encontrado"', async () => {
    const res = await request.delete(`/produtos/${createdId}`).set('Accept', 'application/json');

    expect(res.status).toBe(404);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toHaveProperty('msg', 'Produto não encontrado');
  });
});
