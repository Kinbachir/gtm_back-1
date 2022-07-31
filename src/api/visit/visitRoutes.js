import express from 'express'
import { checkToken } from '../../utils/verifToken'
import { deleteVisit, getVisitsByUser, upsertVisit,getVisitsByUsers } from './visitController'
const router = express.Router();

/**
 * @swagger
 * 
 * /visit/{userId}/{from}/{to}:
 *   get:
 *     tags: [Visit]
 *     summary: get visit list by user(merchandiser)
 *     security:
 *      - jwt: []
 *     description: return visit list by user(merchandiser)
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
 *         description: visit list by user(merchandiser)
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/:userId/:from/:to', checkToken, getVisitsByUser)

/**
 * @swagger
 * 
 * /visit/multiple/{userId}/{from}/{to}:
 *   get:
 *     tags: [Visit]
 *     summary: get visit list by users(merchandiser)
 *     security:
 *      - jwt: []
 *     description: return visit list by users(merchandiser)
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
 *         description: visit list by users(merchandiser)
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
 router.get('/multiple/:userId/:from/:to', checkToken, getVisitsByUsers)

/**
 * @swagger
 * 
 * /visit:
 *   post:
 *     tags: [Visit]
 *     summary: create/update visit
 *     description: update visit if the object contain an id otherwise it create a new one
 *     security:
 *      - jwt: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Visit'
 *     responses:
 *       201:
 *         description: visit created/updated
 *       400:
 *         description: Request error 
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.post('/', checkToken, upsertVisit)

/**
 * @swagger
 * 
 * /visit/{visitId}:
 *   delete:
 *     tags: [Visit]
 *     summary: delete visit
 *     security:
 *      - jwt: []
 *     description: delete visit by id
 *     parameters:
 *       - in: path
 *         name: visitId
 *         required: true
 *     responses:
 *       200:
 *         description: delete visit by id
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.delete('/:visitId', checkToken, deleteVisit)

/**
 * @swagger
 * tags:
 *   name: Visit
 *   description: Visit API's
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Visit:
 *       type: object
 *       required:
 *         - day
 *         - order
 *         - planned
 *         - start
 *         - end
 *         - storeId
 *         - userId
 *       properties:
 *         id:
 *           type: integer
 *           required: false
 *         day:
 *           type: date
 *           required: true
 *         order:
 *           type: integer
 *           required: true
 *         planned:
 *           type: boolean
 *           required: false
 *           default: true
 *         start:
 *           type: date
 *           required: false
 *         end:
 *           type: date
 *           required: false
 *         storeId:
 *           type: integer
 *         userId:
 *           type: integer
 */
module.exports = router;