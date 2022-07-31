import express from 'express'
import { checkToken } from '../../utils/verifToken'
import { getRoles, upsertRole } from './roleController'
const router = express.Router();

/**
 * @swagger
 * 
 * /role:
 *   get:
 *     tags: [Role]
 *     summary: get role list
 *     security:
 *      - jwt: []
 *     description: return role list
 *     responses:
 *       200:
 *         description: role list
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/', checkToken, getRoles)

/**
 * @swagger
 * 
 * /role:
 *   post:
 *     tags: [Role]
 *     summary: create/update role
 *     description: update role if the object contain an id otherwise it create a new one
 *     security:
 *      - jwt: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       201:
 *         description: role created/updated
 *       400:
 *         description: Request error 
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.post('/', checkToken, upsertRole)

/**
 * @swagger
 * tags:
 *   name: Role
 *   description: Role API's
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: the auto-generated id of the role
 *         name:
 *           type: string
 *           description: the name of the role
 */
module.exports = router;