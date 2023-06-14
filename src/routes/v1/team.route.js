const express = require('express');
// const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
const teamController = require('../../controllers/team.controller');

const router = express.Router();

router.route('/:teamId').get(teamController.getTeam);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Team
 *   description: Team
 */
