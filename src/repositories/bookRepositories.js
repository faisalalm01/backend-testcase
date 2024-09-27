const { books } = require("../data/dataStore");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getBooks = async () => {
  return await prisma.book.findMany();
};

exports.getAvailableBooks = async () => {
  // const availableBooks = books.filter((book) => book.stock > 0);
  // return availableBooks;
  const books = await prisma.book.findMany({
    where: {
      stock: {
        gt: 0
      }
    }
  })
  return books
};

exports.getBookByCode = async (code) => {
  // return books.find((book) => book.code === code);
  const book = await prisma.book.findUnique({
    where: {
      code: code,
    },
  });
  return book;
};

exports.updateStockBook = async (bookCode, bookStock) => {
    // const book = this.getBookByCode(bookCode);
    // if (book) {
    //     book.stock += bookStock
    // }
    const book = await this.getBookByCode(bookCode);
    if (book) {
      const updatedBook = await prisma.book.update({
        where: {
          code: bookCode,
        },
        data: {
          stock: book.stock + bookStock,
        },
      });
      return updatedBook;
    }
};
