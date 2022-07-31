import express from 'express'
import { checkToken } from '../../utils/verifToken'
import { getDisplayTypes, upsertDisplayType } from './displayTypeController'
const router = express.Router();

/**
 * @swagger
 * 
 * /displayType:
 *   get:
 *     tags: [DisplayType]
 *     summary: get DisplayType list
 *     security:
 *      - jwt: []
 *     description: return DisplayType list
 *     responses:
 *       200:
 *         description: DisplayType list
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/', checkToken, getDisplayTypes)

/**
 * @swagger
 * 
 * /displayType:
 *   post:
 *     tags: [DisplayType]
 *     summary: create/update DisplayType
 *     description: update DisplayType if the object contain an id otherwise it create a new one
 *     security:
 *      - jwt: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DisplayType'
 *     responses:
 *       201:
 *         description: DisplayType created/updated
 *       400:
 *         description: Request error 
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.post('/', checkToken, upsertDisplayType)

/**
 * @swagger
 * tags:
 *   name: DisplayType
 *   description: DisplayType API's
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DisplayType:
 *       type: object
 *       required:
 *         - name
 *         - abbreviation
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         abbreviation:
 *           type: string
 */
module.exports = router;