import express from 'express'
import { upload } from '../../utils/upload'
import { checkToken } from '../../utils/verifToken'
import { getUsers, upsertUser, getUserByUsername, switchStateUser, resetPassword, updatePassword, getUserByRole } from './userController'
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User API's
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - gender
 *         - username
 *         - password
 *         - email
 *         - phone_number
 *         - profile_picture
 *         - enabled
 *         - roleId
 *       properties:
 *         id:
 *           type: integer
 *         first_name:
 *           type: string
 *           required: true
 *         last_name:
 *           type: string
 *           required: true
 *         gender:
 *           type: string
 *           required: true
 *           description: enum('M','F')
 *         username:
 *           type: string
 *           required: true
 *         password:
 *           type: string
 *           required: true
 *         email:
 *           type: string
 *           required: true
 *         phone_number:
 *           type: string
 *           required: true
 *         profile_picture:
 *           type: string
 *           required: true
 *         enabled:
 *           type: boolean
 *           required: true
 *         roleId:
 *           type: integer
 *           required: true
 */

/**
 * @swagger
 * 
 * /user:
 *   get:
 *     tags: [User]
 *     summary: get user list
 *     security:
 *      - jwt: []
 *     description: return user list
 *     responses:
 *       200:
 *         description: user list
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/', checkToken, getUsers)

/**
 * @swagger
 * 
 * /user/{username}:
 *   get:
 *     tags: [User]
 *     summary: get user list by username
 *     security:
 *      - jwt: []
 *     description: return user list by username
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *     responses:
 *       200:
 *         description: user list by username
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/:username', checkToken, getUserByUsername)

/**
 * @swagger
 * 
 * /user/role/{role}:
 *   get:
 *     tags: [User]
 *     summary: get user list by role
 *     security:
 *      - jwt: []
 *     description: return user list by role
 *     parameters:
 *       - in: path
 *         name: role
 *         required: true
 *     responses:
 *       200:
 *         description: user list by role
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/role/:role', checkToken, getUserByRole)

/**
 * @swagger
 * 
 * /user:
 *   post:
 *     tags: [User]
 *     summary: create/update user
 *     description: update user if the object contain an id otherwise it create a new one
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
 *               user:
 *                 required: true
 *                 type: string
 *     responses:
 *       201:
 *         description: user created/updated
 *       400:
 *         description: Request error 
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.post('/', checkToken, upload("users", 'user').single("file"), upsertUser)

/**
 * @swagger
 * 
 * /user/switchState:
 *   post:
 *     tags: [User]
 *     summary: update user account status
 *     description: update user account status (enable/disable user account)
 *     security:
 *      - jwt: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: account status updated
 *       400:
 *         description: Request error 
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.post('/switchState', checkToken, switchStateUser)

/**
 * @swagger
 * 
 * /user/resetpwd:
 *   post:
 *     tags: [User]
 *     summary: reset password
 *     description: reset user password
 *     security:
 *      - jwt: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: user password updated
 *       400:
 *         description: Request error 
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.post('/resetpwd', checkToken, resetPassword)

/**
 * @swagger
 * 
 * /user/updatepwd:
 *   post:
 *     tags: [User]
 *     summary: update password
 *     description: update user password
 *     security:
 *      - jwt: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: user password updated
 *       400:
 *         description: Request error 
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.post('/updatepwd', checkToken, updatePassword)

module.exports = router;