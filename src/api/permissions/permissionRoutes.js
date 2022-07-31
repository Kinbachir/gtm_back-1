import express from 'express'
import { checkToken } from '../../utils/verifToken'
import { getPermissions, upsertPermission } from './permissionController'
const router = express.Router();

/**
 * @swagger
 * 
 * /permission/{roleId}:
 *   get:
 *     tags: [Permission]
 *     summary: get permission list by role id
 *     security:
 *      - jwt: []
 *     description: return permission list by role id
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *     responses:
 *       200:
 *         description: permission list by role id
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/:roleId', checkToken, getPermissions)

/**
 * @swagger
 * 
 * /permission:
 *   post:
 *     tags: [Permission]
 *     summary: create/update permission
 *     description: update permission if the object contain an id otherwise it create a new one
 *     security:
 *      - jwt: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Permission'
 *     responses:
 *       201:
 *         description: permission created/updated
 *       400:
 *         description: Request error 
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.post('/', checkToken, upsertPermission)

/**
 * @swagger
 * tags:
 *   name: Permission
 *   description: Permission API's
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Permission:
 *       type: object
 *       required:
 *         - can_read
 *         - can_create
 *         - can_update
 *         - module
 *       properties:
 *         id:
 *           type: integer
 *         module:
 *           type: string
 *         can_read:
 *           type: boolean
 *           default: 1
 *         can_create:
 *           type: boolean
 *           default: 0
 *         can_update:
 *           type: boolean
 *           default: 0
 */
module.exports = router;