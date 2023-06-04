const express = require('express');
const projectController = require('../../controllers/project.controller');

const router = express.Router();

router.route('/hot').get(projectController.getHomeHot);
router.route('/carousel').get(projectController.getHomeCarousel);
router.route('/picks').get(projectController.getHomePicks);
router.route('/success').get(projectController.getHomeSuccess);
router.route('/new').get(projectController.getHomeNew);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Home
 *   description: Home
 */

/**
 * @swagger
 * /home/hot:
 *   get:
 *     summary: Get hot type: '0' & sortBy: 'backers:desc'
 *     description: get from project.
 *     tags: [Home]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
