const memberService = require("../services/memberServices");

exports.getMembers = async (req, res) => {
  try {
    return await memberService.getMembers(req, res);
  } catch (error) {
    console.log(error);
  }
};

exports.borrowBook = async (req, res) => {
  try {
    return await memberService.memberBorrowBooks(req, res);
  } catch (error) {
    console.log(error);
  }
};

exports.returnBook = async (req, res) => {
  try {
    return await memberService.memberReturnBooks(req, res);
  } catch (error) {
    console.log(error);
  }
};
