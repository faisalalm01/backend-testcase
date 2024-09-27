const request = require('supertest');
const app = require('../../index');

describe('Check Member List', () => {
  it('should return the list of all members with the number of borrowed books', async () => {
    const res = await request(app).get('/api/members');

    expect(res.status).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
    expect(res.body.data[0]).toHaveProperty('name');
    expect(res.body.data[0]).toHaveProperty('borrowedBooks');
    expect(res.body.data[0].borrowedBooks).toBeInstanceOf(Array);
  });
});
