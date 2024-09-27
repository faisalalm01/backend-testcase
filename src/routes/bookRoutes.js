const routes = require('express').Router();
const bookControllers = require('../controllers/bookControllers');

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of all books
 */
routes.get('/', bookControllers.getBooks);

/**
 * @swagger
 * /api/books/available:
 *   get:
 *     summary: Get all books available
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of all books available
 */
routes.get('/available', bookControllers.getAvalaibleBooks);

module.exports = routes