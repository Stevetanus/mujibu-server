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
 *   description: Home management and retrieval
 */

/**
 * @swagger
 * /home/hot:
 *   get:
 *     summary: Get type 0 & sortBy backers desc.
 *     description: get projects hot.
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

/**
 * @swagger
 * /home/carousel:
 *   get:
 *     summary: Get carousel true.
 *     description: get projects carousel.
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

/**
 * @swagger
 * /home/picks:
 *   get:
 *     summary: Get type 1 & sortBy score desc.
 *     description: get projects picks.
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

/**
 * @swagger
 * /home/success:
 *   get:
 *     summary: Get type 2 & sortBy currentAmountPercentage desc.
 *     description: get projects success.
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

/**
 * @swagger
 * /home/new:
 *   get:
 *     summary: Get type 0 & sortBy startTime desc.
 *     description: get projects new.
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
