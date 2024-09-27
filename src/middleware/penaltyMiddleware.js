const memberRepository = require('../repositories/memberRepositories');

exports.penaltyMiddleware = (req, res, next) => {
  const { memberCode } = req.body;

  const member = memberRepository.getMemberByCode(memberCode);

  if (!member) {
    return res.status(404).send({
      msg: 'Member not found',
      status: 404,
    });
  }

  if (member.penaltyUntil && new Date() < new Date(member.penaltyUntil)) {
    return res.status(403).send({
      msg: `Member is under penalty until ${new Date(member.penaltyUntil).toDateString()}`,
      status: 403,
    });
  }

  next();
};