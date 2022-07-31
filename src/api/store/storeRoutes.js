import express from 'express'
import { upload } from '../../utils/upload';
import { checkToken } from '../../utils/verifToken'
import { getStores, getStoreVisits, upsertStore } from './storeController';
const router = express.Router();

/**
 * @swagger
 * 
 * /store/visits/{storeId}/{limit}/{offset}:
 *   get:
 *     tags: [Store]
 *     summary: get store visits
 *     security:
 *      - jwt: []
 *     description: return list of store visits
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *       - in: path
 *         name: limit
 *         required: true
 *       - in: path
 *         name: offset
 *         required: true
 *     responses:
 *       200:
 *         description: store visit list
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/visits/:storeId/:limit/:offset', checkToken, getStoreVisits)

/**
 * @swagger
 * 
 * /store:
 *   get:
 *     tags: [Store]
 *     summary: get store list
 *     security:
 *      - jwt: []
 *     description: return store list
 *     responses:
 *       200:
 *         description: store list
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/', checkToken, getStores)

/**
 * @swagger
 * 
 * /store:
 *   post:
 *     tags: [Store]
 *     summary: create/update store
 *     description: update store if the object contain an id otherwise it create a new one
 *     security:
 *      - jwt: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               store:
 *                 type: string
 *               customFieldValues:
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
 *         description: store created/updated
 *       400:
 *         description: Request error 
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.post('/', checkToken, upload('store').any(), upsertStore)

/**
 * @swagger
 * tags:
 *   name: Store
 *   description: Store API's
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Store:
 *       type: object
 *       required:
 *         - name
 *         - address 
 *         - governorate
 *         - postal_code
 *         - email
 *         - phone_number
 *         - enabled
 *         - storeGroupId
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         address:
 *           type: string
 *         governorate:
 *           type: string
 *         postal_code:
 *           type: integer
 *         size:
 *           type: string
 *         type:
 *           type: string
 *         email:
 *           type: string
 *         phone_number:
 *           type: string
 *         lat:
 *           type: double
 *         lng:
 *           type: double
 *         path:
 *           type: string
 *         enabled:
 *           type: boolean
 *         storeGroupId:
 *           type: integer
 */
module.exports = router;