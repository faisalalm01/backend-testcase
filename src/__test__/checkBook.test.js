const request = require('supertest');
const app = require('../../index');

describe('Check Book Stock', () => {
  it('should return the list of books with available stock', async () => {
    const res = await request(app).get('/api/books');
    console.log(res);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveLength(5);
    expect(res.body.data[0]).toHaveProperty('title');
    expect(res.body.data[0]).toHaveProperty('stock');
  });
});
