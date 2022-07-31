import express from 'express'
import { upload } from '../../utils/upload';
import { checkToken } from '../../utils/verifToken'
import { getStoreGroup, upsertStoreGroup } from './storeGroupController'
const router = express.Router();

/**
 * @swagger
 * 
 * /storeGroup:
 *   get:
 *     tags: [StoreGroup]
 *     summary: get storeGroup list
 *     security:
 *      - jwt: []
 *     description: return storeGroup list
 *     responses:
 *       200:
 *         description: storeGroup list
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/', checkToken, getStoreGroup)

/**
 * @swagger
 * 
 * /storeGroup:
 *   post:
 *     tags: [StoreGroup]
 *     summary: create/update storeGroup
 *     description: update storeGroup if the object contain an id otherwise it create a new one
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
 *               storeGroup:
 *                 type: string
 *     responses:
 *       201:
 *         description: storeGroup created/updated
 *       400:
 *         description: Request error 
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.post('/', checkToken, upload('storeGroup').single('file'), upsertStoreGroup)

/**
 * @swagger
 * tags:
 *   name: StoreGroup
 *   description: StoreGroup API's
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     StoreGroup:
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