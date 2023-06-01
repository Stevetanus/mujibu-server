const httpStatus = require('http-status');
const { Project } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 *
 * @param {*} projectBody
 * @returns
 */
const createProject = async (projectBody) => {
  // if (await Project.isEmailTaken(userBody.email)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  return Project.create(projectBody);
};

/**
 *
 * @param {*} filter
 * @param {*} options
 * @returns
 */
const queryProjects = async (filter, options) => {
  const projects = await Project.paginate(filter, options);
  return projects;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getProjectById = async (id) => {
  return Project.findById(id);
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateProjectById = async (projectId, updateBody) => {
  const project = await updateProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  Object.assign(project, updateBody);
  await project.save({ validateBeforeSave: true });
  return project;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteProjectById = async (projectId) => {
  const project = await updateProjectById(projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await project.remove();
  return project;
};

module.exports = {
  createProject,
  queryProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
};
