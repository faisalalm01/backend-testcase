const memberRepositories = require("../repositories/memberRepositories");
const bookRepository = require("../repositories/bookRepositories");

exports.getMembers = async (req, res) => {
  try {
    const member = await memberRepositories.getMember();
    return res.json({
      msg: "success get all members",
      status: 200,
      data: member,
    });
  } catch (error) {
    return res.json({
      msg: "failed get all members",
      status: 500,
      error: error,
    });
  }
};

exports.memberBorrowBooks = async (req, res) => {
  try {
    const { memberCode, bookCode } = req.body;
    const member = await memberRepositories.getMemberByCode(memberCode);
    const book = await bookRepository.getBookByCode(bookCode);

    if (!member || !book) {
      return res.json({
        msg: "Member or Book not found",
        status: 404,
      });
    }
    if (book.code <= 0) {
      return res.json({
        msg: "Book is not available",
        status: 400,
      });
    }
    const borrowedBooks = member.borrowedBooks || [];

    if (borrowedBooks.length >= 2) {
      return res.json({
        msg: "Member cannot borrow more than 2 books",
        status: 400,
      });
    }
    if (book.stock < 1) {
      return res.json({
        msg: "Book stock not available",
        status: 400,
      });
    }
    borrowedBooks.push(book);
    await bookRepository.updateStockBook(bookCode, -1);
    await memberRepositories.updateBorrowedBooks(
      memberCode,
      member.borrowedBooks
    );
    return res.json({
      msg: `Book ${book.title} borrowed successfully by member ${member.name}`,
      status: 200,
      data: member,
    });
  } catch (error) {
    return res.json({
      msg: "failed borrowed book",
      status: 500,
      error: console.log(error),
    });
  }
};

exports.memberReturnBooks = async (req, res) => {
  try {
    const { memberCode, bookCode } = req.body;
    const member = await memberRepositories.getMemberByCode(memberCode);
    const book = await bookRepository.getBookByCode(bookCode);

    if (!member || !book) {
      return res.json({
        msg: "Member or Book not found",
        status: 404,
      });
    }

    const borrowedBooks = member.borrowedBooks || [];

    const borrowedBook = borrowedBooks.find((b) => b.code === bookCode);
    if (!borrowedBook) {
      return res.json({
        msg: "Member did not borrow this book",
        status: 400,
      });
    }

    const currentDate = new Date();
    const borrowDate = new Date(borrowedBook.borrowDate);
    const diffDays = Math.ceil(
      (currentDate - borrowDate) / (1000 * 60 * 60 * 24)
    );

    if (diffDays > 7) {
      const penaltyUntil = new Date(
        currentDate.setDate(currentDate.getDate() + 3)
      );
      member.penaltyUntil = penaltyUntil;
    }

    member.borrowedBooks = member.borrowedBooks.filter(
      (b) => b.code !== bookCode
    );
    await bookRepository.updateStockBook(bookCode, 1);
    await memberRepositories.updateBorrowedBooks(
      memberCode,
      member.borrowedBooks
    );
    return res.json({
      msg: `Book ${book.title} returned successfully by member ${member.name}`,
      status: 200,
      data: {
        book,
        penaltyUntil: member.penaltyUntil
          ? `Member penalized until ${member.penaltyUntil.toDateString()}`
          : null,
      },
    });
  } catch (error) {
    return res.json({
      msg: "failed returned book",
      status: 500,
      error: console.log(error),
    });
  }
};
