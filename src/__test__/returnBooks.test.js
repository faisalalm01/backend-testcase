const request = require('supertest');
const app = require('../../index');

describe('Member Return Book', () => {
  it('should allow a member to return a borrowed book', async () => {
    const res = await request(app)
      .post('/api/members/return')
      .send({
        memberCode: 'M001',
        bookCode: 'JK-45',
      });

    expect(res.body.status).toBe(200);
    expect(res.body.msg).toBe('Book Harry Potter returned successfully by member Angga');
  });

  it('should not allow a member to return a book they did not borrow', async () => {
    const res = await request(app)
      .post('/api/members/return')
      .send({
        memberCode: 'M003',
        bookCode: 'HOB-83',
      });

    expect(res.body.status).toBe(400);
    expect(res.body.msg).toBe('Member did not borrow this book');
  });

  it('should apply penalty if the book is returned late', async () => {
    const res = await request(app)
      .post('/api/members/return')
      .send({
        memberCode: 'M001',
        bookCode: 'JK-45',
        borrowDate: '2023-08-01',
      });

    expect(res.body.status).toBe(200);
    expect(res.body.data.penaltyUntil).toContain('Member penalized until');
  });
});
