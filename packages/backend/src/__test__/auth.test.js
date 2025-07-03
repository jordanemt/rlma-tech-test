/* eslint-disable no-undef */
import request from 'supertest';
import app from '../app.js';

describe('POST /login', () => {
  it('should return 200 and a token for valid credentials', async () => {
    const res = await request(app).post('/api/login').send({});
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
