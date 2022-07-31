import express from 'express'
import { upload } from '../../utils/upload';
import { checkToken } from '../../utils/verifToken'
import { deleteDisplay, getDisplay, getDisplayByUser, upsertDisplay } from './displayController';
const router = express.Router();

/**
 * @swagger
 * 
 * /display:
 *   get:
 *     tags: [Display]
 *     summary: get Display list
 *     security:
 *      - jwt: []
 *     description: return Display list
 *     responses:
 *       200:
 *         description: Display list
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/', checkToken, getDisplay)

/**
 * @swagger
 * 
 * /display/{userId}/{from}/{to}:
 *   get:
 *     tags: [Display]
 *     summary: get Display list by user between two dates
 *     security:
 *      - jwt: []
 *     description: return Display list by user between two dates
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *       - in: path
 *         name: from
 *         required: true
 *       - in: path
 *         name: to
 *         required: true
 *     responses:
 *       200:
 *         description: Display list by user between two dates
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
 router.get('/:userId/:from/:to', checkToken, getDisplayByUser)

/**
 * @swagger
 * 
 * /display:
 *   post:
 *     tags: [Display]
 *     summary: create/update Display
 *     description: update Display if the object contain an id otherwise it create a new one
 *     security:
 *      - jwt: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Display'
 *     responses:
 *       201:
 *         description: Display created/updated
 *       400:
 *         description: Request error 
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.post('/', checkToken, upload('displayData').array('files'), upsertDisplay)

/**
 * @swagger
 * 
 * /display/{displayId}:
 *   delete:
 *     tags: [Display]
 *     summary: delete display
 *     security:
 *      - jwt: []
 *     description: delete display by id
 *     parameters:
 *       - in: path
 *         name: displayId
 *         required: true
 *     responses:
 *       200:
 *         description: delete display by id
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
 router.delete('/:displayId', checkToken, deleteDisplay)

/**
 * @swagger
 * tags:
 *   name: Display
 *   description: Display API's
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Display:
 *       type: object
 *       required:
 *         - userId
 *         - storeId
 *       properties:
 *         id:
 *           type: integer
 *         storeId:
 *           type: integer
 *         userId:
 *           type: integer
 *         displayTypeId:
 *           type: integer
 *         categoryId:
 *           type: integer
 *         brandId:
 *           type: integer
 */
module.exports = router;