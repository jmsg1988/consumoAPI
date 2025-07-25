const request = require('supertest');
const express = require('express');
const datosRouter = require('../routes/datos'); // tu router

const app = express();
app.use(express.json());
app.use('/', datosRouter);

describe('GET /limite', () => {
  it('devuelve el limite y las instrucciones', async () => {
    const res = await request(app).get('/limite');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('limite');
    expect(res.body).toHaveProperty('instrucciones');
  });
});

describe('POST /limite', () => {
  it('actualiza el limite si el valor es numérico', async () => {
    const nuevoLimite = 4321;
    const res = await request(app)
      .post('/limite')
      .send({ nuevoLimite });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ success: true, nuevoLimite });
  });

  it('rechaza si el valor no es numérico', async () => {
    const res = await request(app)
      .post('/limite')
      .send({ nuevoLimite: "no-numero" });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});