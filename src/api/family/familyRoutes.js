import express from 'express'
import { checkToken } from '../../utils/verifToken'
import { getFamilies, upsertFamily } from './familyController'
const router = express.Router();

/**
 * @swagger
 * 
 * /family:
 *   get:
 *     tags: [Family]
 *     summary: get family list
 *     security:
 *      - jwt: []
 *     description: return family list
 *     responses:
 *       200:
 *         description: family list
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/', checkToken, getFamilies)

/**
 * @swagger
 * 
 * /family:
 *   post:
 *     tags: [Family]
 *     summary: create/update family
 *     description: update family if the object contain an id otherwise it create a new one
 *     security:
 *      - jwt: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Family'
 *     responses:
 *       201:
 *         description: family created/updated
 *       400:
 *         description: Request error 
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.post('/', checkToken, upsertFamily)

/**
 * @swagger
 * tags:
 *   name: Family
 *   description: Family API's
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Family:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 */
module.exports = router;