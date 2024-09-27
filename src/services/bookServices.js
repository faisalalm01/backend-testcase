const bookRepositories = require("../repositories/bookRepositories");

exports.getBooks = async (req, res) => {
  try {
    const books = await bookRepositories.getBooks();
    return res.json({
      msg: "success get book",
      status: 200,
      data: books,
    });
  } catch (error) {
    return res.json({
      msg: "failed get book",
      status: 500,
      error: error,
    });
  }
};

exports.getAvailableBooks = async (req, res) => {
  try {
    const books = await bookRepositories.getAvailableBooks();
    return res.json({
      msg: "success get book available",
      status: 200,
      data: books,
    });
  } catch (error) {
    return res.json({
      msg: "failed get book available",
      status: 500,
      error: error,
    });
  }
};
