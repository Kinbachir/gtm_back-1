import express from 'express'
import { upload } from '../../utils/upload';
import { checkToken } from '../../utils/verifToken'
import { getOrders, upsertOrder } from './orderController'
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order API's
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - code
 *         - date
 *         - amount
 *         - path
 *       properties:
 *         id:
 *           type: integer
 *           description: the auto-generated id of the order
 *         code:
 *           type: string
 *           description: the order code
 *         date:
 *           type: date
 *           description: the order date
 *         amount:
 *           type: number
 *           description: the order amount
 *         path:
 *           type: string
 *           description: the path of the order image
 */

/**
 * @swagger
 * 
 * /order:
 *   get:
 *     tags: [Order]
 *     summary: get order list
 *     security:
 *      - jwt: []
 *     description: return order list
 *     responses:
 *       200:
 *         description: order list
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/', checkToken, getOrders)

/**
 * @swagger
 * 
 * /order:
 *   post:
 *     tags: [Order]
 *     summary: create/update order
 *     description: update order if the object contain an id otherwise it create a new one with orderdetail list
 *     security:
 *      - jwt: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: order created/updated
 *       400:
 *         description: Request error 
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.post('/', checkToken, upload('CMD').any(), upsertOrder)

module.exports = router;