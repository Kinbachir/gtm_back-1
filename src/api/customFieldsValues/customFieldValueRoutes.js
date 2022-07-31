import express from 'express'
import { checkToken } from '../../utils/verifToken'
import { getCustomFieldValues } from './customFieldValueController'
const router = express.Router();

/**
 * @swagger
 * 
 * /customFieldValue/{storeId}:
 *   get:
 *     tags: [CustomFieldValue]
 *     summary: get customFieldValue list by entity 
 *     security:
 *      - jwt: []
 *     description: return customFieldValue list by storeId
 *     parameters:
 *       - in: path
 *         name: storeId
 *         required: true
 *     responses:
 *       200:
 *         description: customFieldValue list by storeId
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/:storeId', checkToken, getCustomFieldValues)

/**
 * @swagger
 * tags:
 *   name: CustomFieldValue
 *   description: CustomFieldValue API's
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CustomFieldValue:
 *       type: object
 *       required:
 *         - value
 *       properties:
 *         id:
 *           type: integer
 *         value:
 *           type: string
 *         customFieldId:
 *           type: integer
 *         storeId :
 *           type: integer
 *         productId:
 *           type: integer
 */
module.exports = router;