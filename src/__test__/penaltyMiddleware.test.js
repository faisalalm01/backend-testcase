const penaltyMiddleware = require('../src/middleware/penaltyMiddleware');
const memberRepository = require('../src/repositories/memberRepositories');

jest.spyOn(memberRepository, 'getMemberByCode').mockImplementation((memberCode) => {
  return memberCode === 'M001' ? { code: 'M001', penaltyUntil: new Date(Date.now() + 86400000) } : { code: 'M002', penaltyUntil: null };
});

describe('Penalty Middleware Tests', () => {
  it('should allow member without penalty to proceed', () => {
    const req = { body: { memberCode: 'M002' } };
    const res = {};
    const next = jest.fn();

    penaltyMiddleware.penaltyMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should block member with active penalty', () => {
    const req = { body: { memberCode: 'M001' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const next = jest.fn();

    penaltyMiddleware.penaltyMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith({
      msg: expect.stringContaining('Member is under penalty until'),
      status: 403,
    });
    expect(next).not.toHaveBeenCalled();
  });
});
