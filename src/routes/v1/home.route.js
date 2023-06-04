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
