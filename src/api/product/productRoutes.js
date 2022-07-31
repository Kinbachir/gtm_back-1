import express from 'express'
import { upload } from '../../utils/upload'
import { checkToken } from '../../utils/verifToken'
import { getProducts, upsertProduct } from './productController'
const router = express.Router()

/**
 * @swagger
 * 
 * /product:
 *   get:
 *     tags: [Product]
 *     summary: get product list
 *     security:
 *      - jwt: []
 *     description: return product list
 *     responses:
 *       200:
 *         description: product list
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/', checkToken, getProducts)

/**
 * @swagger
 * 
 * /product:
 *   post:
 *     tags: [Product]
 *     summary: create/update product
 *     description: update product if the object contain an id otherwise it create a new one
 *     security:
 *      - jwt: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *               internalCodes:
 *                 type: string
 *               file:
 *                 type: string
 *                 format: binary
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: product created/updated
 *       400:
 *         description: Request error 
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.post('/', checkToken, upload('product').any(), upsertProduct)

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product API's
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - label
 *         - barcode
 *         - typology
 *         - enabled
 *       properties:
 *         id:
 *           type: integer
 *         label:
 *           type: string
 *         barcode:
 *           type: string
 *         typology:
 *           type: integer
 *         path:
 *           type: string
 *         enabled:
 *           type: boolean
 *         categoryId:
 *           type: integer
 *         brandId:
 *           type: integer
 */
module.exports = router