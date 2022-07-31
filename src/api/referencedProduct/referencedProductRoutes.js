import express from 'express'
import { checkToken } from '../../utils/verifToken'
import { getReferencedProducts, upsertReferencedProduct } from './referencedProductController';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ReferencedProduct
 *   description: ReferencedProduct API's
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ReferencedProduct:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         storeId:
 *           type: integer
 *         productId:
 *           type: integer
 *         available:
 *           type: boolean
 */

/**
 * @swagger
 * 
 * /referencedProduct/{storeId}:
 *   get:
 *     tags: [ReferencedProduct]
 *     summary: get ReferencedProduct list
 *     security:
 *      - jwt: []
 *     description: return ReferencedProduct list
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *     responses:
 *       200:
 *         description: ReferencedProduct list
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/:storeId', checkToken, getReferencedProducts)

/**
 * @swagger
 * 
 * /referencedProduct:
 *   post:
 *     tags: [ReferencedProduct]
 *     summary: create/update ReferencedProduct
 *     description: update ReferencedProduct if the object contain an id otherwise it create a new one
 *     security:
 *      - jwt: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReferencedProduct'
 *     responses:
 *       201:
 *         description: ReferencedProduct created/updated
 *       400:
 *         description: Request error 
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.post('/', checkToken, upsertReferencedProduct)

module.exports = router;