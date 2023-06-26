const express = require('express');
// const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const projectValidation = require('../../validations/project.validation');
const projectController = require('../../controllers/project.controller');

const router = express.Router();

router.route('/list').get(validate(projectValidation.getProjects), projectController.getProjects);
router.route('/:projectId/status').patch(validate(projectValidation.getProjectById), projectController.patchProjectStatus);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Projects
 */
