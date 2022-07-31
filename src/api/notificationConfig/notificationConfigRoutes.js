import express from 'express'
import { checkToken } from '../../utils/verifToken'
import { getNotificationConfigs, upsertNotificationConfig } from './notificationConfigController'
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: NotificationConfig
 *   description: NotificationConfig API's
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NotificationConfig:
 *       type: object
 *       required:
 *         - email
 *         - sms
 *       properties:
 *         id:
 *           type: integer
 *         email:
 *           type: boolean
 *         sms:
 *           type: boolean
 *         type:
 *           type: string
 */

/**
 * @swagger
 * 
 * /notificationConfig:
 *   get:
 *     tags: [NotificationConfig]
 *     summary: get NotificationConfig list
 *     security:
 *      - jwt: []
 *     description: return NotificationConfig list
 *     responses:
 *       200:
 *         description: NotificationConfig list
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/', checkToken, getNotificationConfigs)

/**
 * @swagger
 * 
 * /notificationConfig:
 *   post:
 *     tags: [NotificationConfig]
 *     summary: create/update notificationConfig
 *     description: update notificationConfig if the object contain an id otherwise it create a new one
 *     security:
 *      - jwt: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NotificationConfig'
 *     responses:
 *       201:
 *         description: notificationConfig created/updated
 *       400:
 *         description: Request error 
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
 router.post('/', checkToken, upsertNotificationConfig)

module.exports = router;