import express from 'express'
import { checkToken } from '../../utils/verifToken'
import { getDisplaySectionsBydisplayType, upsertDisplaySection } from './displaySectionController'
const router = express.Router();

/**
 * @swagger
 * 
 * /displaySection/{displayTypeId}:
 *   get:
 *     tags: [DisplaySection]
 *     summary: get DisplaySection list
 *     security:
 *      - jwt: []
 *     description: return DisplaySection list
 *     parameters:
 *       - in: path
 *         name: displayTypeId
 *         required: true
 *     responses:
 *       200:
 *         description: DisplaySection list
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/:displayTypeId', checkToken, getDisplaySectionsBydisplayType)

/**
 * @swagger
 * 
 * /displaySection:
 *   post:
 *     tags: [DisplaySection]
 *     summary: create/update DisplaySection
 *     description: update DisplaySection if the object contain an id otherwise it create a new one
 *     security:
 *      - jwt: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DisplaySection'
 *     responses:
 *       201:
 *         description: DisplaySection created/updated
 *       400:
 *         description: Request error 
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.post('/', checkToken, upsertDisplaySection)

/**
 * @swagger
 * tags:
 *   name: DisplaySection
 *   description: DisplaySection API's
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DisplaySection:
 *       type: object
 *       required:
 *         - name
 *         - displayTypeId
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         displayTypeId:
 *           type: integer
 */
module.exports = router;