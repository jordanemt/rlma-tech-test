/* eslint-disable no-undef */
import request from 'supertest';
import app from '../app.js';
import getClient from '../common/db.js';

let token;

beforeAll(async () => {
  const res = await request(app).post('/api/login').send({});
  token = res.body.token;
  await request(app)
    .post('/api/import')
    .set('Authorization', `Bearer ${token}`)
    .send({});
});

afterAll(async () => {
  const client = getClient();
  await client.query('TRUNCATE TABLE rooming_list RESTART IDENTITY CASCADE');
  await client.query('TRUNCATE TABLE booking RESTART IDENTITY CASCADE');
  await client.end();
});

describe('GET /api/rooming-lists/filter', () => {
  it('should return filtered rooming lists by status', async () => {
    const res = await request(app)
      .get('/api/rooming-lists/filter')
      .set('Authorization', `Bearer ${token}`)
      .query({ status: ['completed'] });
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((item) => {
      expect(item.status).toBe('completed');
    });
  });

  it('should return filtered rooming lists by search', async () => {
    const res = await request(app)
      .get('/api/rooming-lists/filter')
      .set('Authorization', `Bearer ${token}`)
      .query({ search: 'Miami' });
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((item) => {
      expect(item.event_name).toMatch(/Miami/i);
    });
  });

  it('should return filtered rooming lists by status and search', async () => {
    const res = await request(app)
      .get('/api/rooming-lists/filter')
      .set('Authorization', `Bearer ${token}`)
      .query({ status: ['received'], search: 'ACL' });
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach((item) => {
      expect(item.status).toBe('received');
      expect(item.rfp_name).toMatch(/ACL/i);
    });
  });

  it('should return all rooming lists if no filter is provided', async () => {
    const res = await request(app)
      .get('/api/rooming-lists/filter')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
