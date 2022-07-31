import express from 'express'
import { checkToken } from '../../utils/verifToken'
import { getSysDate } from './utilsController'
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Utils
 *   description: Utils API's
 */

/**
 * @swagger
 * 
 * /utils/getSysDate:
 *   get:
 *     tags: [Utils]
 *     summary: get sysDate
 *     security:
 *      - jwt: []
 *     description: return server date
 *     responses:
 *       200:
 *         description: return server date
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/getSysDate', checkToken, getSysDate)

module.exports = router;