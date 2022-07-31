import express from 'express'
import { checkToken } from '../../utils/verifToken'
import { getNotification, updateNotification } from './notificationController';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notification
 *   description: Notification API's
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: the notification title
 *         text:
 *           type: string
 *           description: the notification text
 *         link:
 *           type: string
 *           description: the notification link
 *         consulted:
 *           type: boolean
 *           description: the notification status
 */

/**
 * @swagger
 * 
 * /notification/updateStatus:
 *   post:
 *     tags: [Notification]
 *     summary: update Notifications
 *     description: update Notifications status
 *     security:
 *      - jwt: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       201:
 *         description: Notifications updated
 *       400:
 *         description: Request error 
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.post('/updateStatus', checkToken, updateNotification)

/**
 * @swagger
 * 
 * /notification:
 *   get:
 *     tags: [Notification]
 *     summary: get Notification list by user (admin)
 *     security:
 *      - jwt: []
 *     description: return Notification list
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *       - in: path
 *         name: limit
 *         required: true
 *       - in: path
 *         name: offset
 *         required: true
 *     responses:
 *       200:
 *         description: Notification list by user (admin)
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/:userId/:limit/:offset', checkToken, getNotification)

module.exports = router;