const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
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

  for (const book of books) {
    await prisma.book.create({
      data: book,
    });
  }

  for (const member of members) {
    await prisma.member.create({
      data: member,
    });
  }

  console.log('Seed data successfully added');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
