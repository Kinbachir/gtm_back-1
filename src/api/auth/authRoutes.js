import express from 'express';
import { login } from './authController';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth API's
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: username of the user
 *         password:
 *           type: string
 *           description: the password of the user
 */

/**
 *  @swagger
 * 
 *  /auth/login:
 *    post:
 *      tags: [Auth]
 *      summary: Login
 *      description: log user
 *      security:
 *       - jwt: []
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Login'
 *      responses:
 *        200:
 *          description: User connected and token generated
 *        400:
 *          description: Request error 
 *        401:
 *          description: Unauthorized
 *        403: 
 *          description: forbidden
 */
router.post('/login', login);

module.exports = router;