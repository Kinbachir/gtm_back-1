import express from 'express'
import { checkToken } from '../../utils/verifToken'
import { getCategories, getCategoriesByFamily, upsertCategory } from './categoryController'
const router = express.Router();

/**
 * @swagger
 * 
 * /category:
 *   get:
 *     tags: [Category]
 *     summary: get category list
 *     security:
 *      - jwt: []
 *     description: return category list
 *     responses:
 *       200:
 *         description: category list
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/', checkToken, getCategories)

/**
 * @swagger
 * 
 * /category/{familyId}:
 *   get:
 *     tags: [Category]
 *     summary: get category list by family id
 *     security:
 *      - jwt: []
 *     description: return category list by family id
 *     parameters:
 *       - in: path
 *         name: familyId
 *         required: true
 *     responses:
 *       200:
 *         description: category list by family id
 *       400:
 *         description: Request error
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.get('/:familyId', checkToken, getCategoriesByFamily)

/**
 * @swagger
 * 
 * /category:
 *   post:
 *     tags: [Category]
 *     summary: create/update category
 *     description: update category if the object contain an id otherwise it create a new one
 *     security:
 *      - jwt: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: category created/updated
 *       400:
 *         description: Request error 
 *       401:
 *         description: Unauthorized
 *       403: 
 *         description: forbidden
 */
router.post('/', checkToken, upsertCategory)

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category API's
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         familyId:
 *           type: integer
 */
module.exports = router;