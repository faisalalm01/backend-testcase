const bookServices = require("../services/bookServices");

exports.getBooks = (req, res) => {
  try {
    return bookServices.getBooks(req, res);
  } catch (error) {
    console.log(error);
  }
};

exports.getAvalaibleBooks = (req, res) => {
  try {
    return bookServices.getAvailableBooks(req, res);
  } catch (error) {
    console.log(error);
  }
};
