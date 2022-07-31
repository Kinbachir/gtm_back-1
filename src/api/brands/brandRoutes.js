import express from 'express'
import { upload } from '../../utils/upload';
import { checkToken } from '../../utils/verifToken'
import { getBrands, upsertBrand } from './brandController'
const router = express.Router();

/**
 * @swagger
 * 
 * /brand:
 *   get:
 *     tags: [Brand]
 *     summary: get brand list
 *     security:
 *      - jwt: []
 *     description: return brand list
 *     responses:
 *       200:
 *         description: brand list
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/', checkToken, getBrands)

/**
 * @swagger
 * 
 * /brand:
 *   post:
 *     tags: [Brand]
 *     summary: create/update brand
 *     description: update brand if the object contain an id otherwise it create a new one
 *     security:
 *      - jwt: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *               brand:
 *                 required: true
 *                 type: string
 *     responses:
 *       201:
 *         description: brand created/updated
 *       400:
 *         description: Request error 
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.post('/', checkToken, upload('brand').single('file'), upsertBrand)

/**
 * @swagger
 * tags:
 *   name: Brand
 *   description: Brand API's
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       required:
 *         - name
 *         - enabled
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         path:
 *           type: string
 *         enabled:
 *           type: boolean
 */
module.exports = router;