const mainRoutes = require('express').Router();
const checkPenalty = require('../middleware/penaltyMiddleware');
const bookRoutes = require('./bookRoutes');
const memberRoutes = require('./memberRoutes')

/**
 * @swagger
 * /api:
 *   get:
 *     summary: api its works 🐻
 *     responses:
 *       200:
 *         description: api its works 🐻
 */

mainRoutes.use('/books', bookRoutes);
mainRoutes.use('/members', memberRoutes)

module.exports = mainRoutes