import express from 'express'
import { checkToken } from '../../utils/verifToken'
import { getStockByStore, getStockByUser, getStockDays, upsertStock } from './stockController';
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Stock
 *   description: Stock API's
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Stock:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         storeId:
 *           type: integer
 *         productId:
 *           type: integer
 *         quantity:
 *           type: integer
 *         stockOut:
 *           type: boolean
 *           default: false
 */

/**
 * @swagger
 * 
 * /stock/{storeId}/{from}:
 *   get:
 *     tags: [Stock]
 *     summary: get Stock list by store
 *     security:
 *      - jwt: []
 *     description: return Stock list by store
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *       - in: path
 *         name: from
 *         required: true
 *     responses:
 *       200:
 *         description: Stock list by store
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/:storeId/:from', checkToken, getStockByStore)

/**
 * @swagger
 * 
 * /stock/user/{userId}/{from}/{to}:
 *   get:
 *     tags: [Stock]
 *     summary: get Stock list by user
 *     security:
 *      - jwt: []
 *     description: return Stock list by user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *       - in: path
 *         name: from
 *         reuired: true
 *     responses:
 *       200:
 *         description: Stock list by user
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/user/:userId/:from/:to', checkToken, getStockByUser)

/**
 * @swagger
 * 
 * /stock:
 *   post:
 *     tags: [Stock]
 *     summary: create/update Stock
 *     description: update Stock if the object contain an id otherwise it create a new one
 *     security:
 *      - jwt: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Stock'
 *     responses:
 *       201:
 *         description: Stock created/updated
 *       400:
 *         description: Request error 
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.post('/', checkToken, upsertStock)

/**
 * @swagger
 * 
 * /stock/days/{storeId}/{days}:
 *   get:
 *     tags: [Stock]
 *     summary: get Stock visits
 *     security:
 *      - jwt: []
 *     description: return Stock visits
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *       - in: path
 *         name: days
 *         required: true
 *     responses:
 *       200:
 *         description: Stock visits
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/days/:storeId/:days', checkToken, getStockDays)

module.exports = router;