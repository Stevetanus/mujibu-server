const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { projectService } = require('../services');

const createProject = catchAsync(async (req, res) => {
  const project = await projectService.createProject(req.body);
  res.status(httpStatus.CREATED).send(project);
});

const getProjects = catchAsync(async (req, res) => {
  const { query } = req;
  const result = await projectService.getProjects(query);
  res.send(result);
});

const getProject = catchAsync(async (req, res) => {
  const project = await projectService.getProjectById(req.params.projectId);
  if (!project) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  }
  res.send(project);
});

const updateProject = catchAsync(async (req, res) => {
  const user = await projectService.updateProjectById(req.params.userId, req.body);
  res.send(user);
});

const deleteProject = catchAsync(async (req, res) => {
  await projectService.deleteUserById(req.params.projectId);
  res.status(httpStatus.NO_CONTENT).send();
});

const postFakeProjects = catchAsync(async (req, res) => {
  const { query } = req;
  const projectsFake = await projectService.postFakeProjects(query);
  res.send(projectsFake);
});

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  postFakeProjects,
};
