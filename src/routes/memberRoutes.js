const routes = require('express').Router();
const memberControllers = require('../controllers/memberControllers');
const checkPenalty = require('../middleware/penaltyMiddleware');

/**
 * @swagger
 * /api/members:
 *   get:
 *     summary: Get all members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: List of all members
 */
routes.get('/', memberControllers.getMembers);

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     BorrowBookRequest:
//  *       type: object
//  *       properties:
//  *         memberCode:
//  *           type: string
//  *           description: Member code
//  *         bookCode:
//  *           type: string
//  *           description: Book code
//  *       required:
//  *         - memberCode
//  *         - bookCode
//  * 
//  *     ReturnBookRequest:
//  *       type: object
//  *       properties:
//  *         memberCode:
//  *           type: string
//  *           description: Member code
//  *         bookCode:
//  *           type: string
//  *           description: Book code
//  *       required:
//  *         - memberCode
//  *         - bookCode
//  */

/**
 * @swagger
 * /api/members/borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BorrowBookRequest'
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 status:
 *                   type: integer
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad request, book cannot be borrowed
 *       404:
 *         description: Member or book not found
 */
routes.post('/borrow', checkPenalty.penaltyMiddleware, memberControllers.borrowBook);

/**
 * @swagger
 * /api/members/return:
 *   post:
 *     summary: Return a book
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReturnBookRequest'
 *     responses:
 *       200:
 *         description: Book returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 status:
 *                   type: integer
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad request, book not borrowed by member
 *       404:
 *         description: Member or book not found
 */
routes.post('/return', checkPenalty.penaltyMiddleware, memberControllers.returnBook);

module.exports = routes