const books = [
    { code: 'JK-45', title: 'Harry Potter', author: 'J.K Rowling', stock: 1 },
    { code: 'SHR-1', title: 'A Study in Scarlet', author: 'Arthur Conan Doyle', stock: 1 },
    { code: 'TW-11', title: 'Twilight', author: 'Stephenie Meyer', stock: 1 },
    { code: 'HOB-83', title: 'The Hobbit', author: 'J.R.R. Tolkien', stock: 1 },
    { code: 'NRN-7', title: 'The Lion, the Witch and the Wardrobe', author: 'C.S. Lewis', stock: 1 }
  ];
  
  const members = [
    { code: 'M001', name: 'Angga', borrowedBooks: [], penaltyUntil: null },
    { code: 'M002', name: 'Ferry', borrowedBooks: [], penaltyUntil: null },
    { code: 'M003', name: 'Putri', borrowedBooks: [], penaltyUntil: null }
  ];
  
  module.exports = { books, members };
  