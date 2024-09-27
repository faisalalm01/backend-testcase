const { members } = require("../data/dataStore");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getMember = async () => {
    return await prisma.member.findMany()
}

exports.getMemberByCode = async (code) => {
    const member = await prisma.member.findUnique({
        where: {
          code: code,
        },
      });
      return member;
}

exports.updateBorrowedBooks = async (memberCode, books) => {
    const member = await this.getMemberByCode(memberCode);
    if (member) {
      await prisma.member.update({
        where: {
          code: memberCode,
        },
        data: {
          borrowedBooks: books
        },
      });
      return true;
    }
}