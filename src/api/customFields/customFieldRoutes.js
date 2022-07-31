import express from 'express'
import { upload } from '../../utils/upload';
import { checkToken } from '../../utils/verifToken'
import { getCustomFields, upsertCustomField } from './customFieldController'
const router = express.Router();

/**
 * @swagger
 * 
 * /customField/{entity}:
 *   get:
 *     tags: [CustomField]
 *     summary: get customField list by entity 
 *     security:
 *      - jwt: []
 *     description: return customField list by entity (table_name)
 *     parameters:
 *       - in: path
 *         name: entity
 *         required: true
 *     responses:
 *       200:
 *         description: customField list by entity
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/:entity', checkToken, getCustomFields)

/**
 * @swagger
 * 
 * /customField:
 *   post:
 *     tags: [CustomField]
 *     summary: create/update customField
 *     description: update customField if the object contain an id otherwise it create a new one
 *     security:
 *      - jwt: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomField'
 *     responses:
 *       201:
 *         description: category created/updated
 *       400:
 *         description: Request error 
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.post('/', checkToken, upsertCustomField)

/**
 * @swagger
 * tags:
 *   name: CustomField
 *   description: CustomField API's
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CustomField:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         table_name:
 *           type: string
 *         type:
 *           type: string
 */
module.exports = router;