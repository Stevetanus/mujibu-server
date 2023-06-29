// const httpStatus = require('http-status');
// const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { projectService } = require('../services');

const postFakeProjects = catchAsync(async (req, res) => {
  const { query } = req;
  const projectsFake = await projectService.postFakeProjects(query);
  res.send(projectsFake);
});

const getProjects = catchAsync(async (req, res) => {
  const { query } = req;
  const result = await projectService.getProjects(query);
  res.send(result);
});

const getBackendProjects = catchAsync(async (req, res) => {
  const { query } = req;
  const result = await projectService.getBackendProjects(query);
  res.send(result);
});

const getProjectById = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const result = await projectService.getProjectById(projectId);
  res.send(result);
});

const getHomeHot = catchAsync(async (req, res) => {
  const filter = { projectForm: '0', projectStatus: { $nin: [0, 1, 2] } }; // 搜尋條件
  const options = {
    sortBy: 'projectBackers:desc', // 排序
    limit: 6, // 取前 6 筆
    page: 1, // 頁數
  };
  const { data } = await projectService.queryProjectsHot(filter, options);
  res.send({ status: 'Success', data });
});

const getHomeCarousel = catchAsync(async (req, res) => {
  const filter = { carousel: true, projectStatus: { $nin: [0, 1, 2] } }; // 搜尋條件
  const options = {
    // sortBy: 'backers:desc', // 排序
    limit: 6, // 取前 6 筆
    page: 1, // 頁數
  };
  const { data } = await projectService.queryProjectsCarousel(filter, options);
  res.send({ status: 'Success', data });
});

const getHomePicks = catchAsync(async (req, res) => {
  const filter = { projectForm: '1', projectStatus: { $nin: [0, 1, 2] } }; // 搜尋條件
  const options = {
    sortBy: 'projectScore:desc', // 排序
    limit: 6, // 取前 6 筆
    page: 1, // 頁數
  };
  const { data } = await projectService.queryProjectsPicks(filter, options);
  res.send({ status: 'Success', data });
});

const getHomeSuccess = catchAsync(async (req, res) => {
  const filter = { projectForm: '2', projectStatus: { $nin: [0, 1, 2] } }; // 搜尋條件
  const options = {
    sortBy: 'currentAmountPercentage:desc', // 排序
    limit: 6, // 取前 6 筆
    page: 1, // 頁數
  };
  const { data } = await projectService.queryProjectsSuccess(filter, options);
  res.send({ status: 'Success', data });
});

const getHomeNew = catchAsync(async (req, res) => {
  const filter = { projectForm: '0', projectStatus: { $nin: [0, 1, 2] } }; // 搜尋條件
  const options = {
    sortBy: 'startTime:desc', // 排序
    limit: 6, // 取前 6 筆
    page: 1, // 頁數
  };
  const { data } = await projectService.queryProjectsNew(filter, options);
  res.send({ status: 'Success', data });
});

const postProject = catchAsync(async (req, res, next) => {
  const project = await projectService.createProject(req);
  req.project = project;
  next();
});

const patchProjectStatus = catchAsync(async (req, res) => {
  try {
    const result = await projectService.updateProjectStatusById(req, res);
    // 檢查專案是否存在
    if (!result) {
      return res.status(404).json({ error: 'Project not found.' });
    }
    // 返回更新後的專案資料
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

module.exports = {
  postFakeProjects,
  getProjects,
  getBackendProjects,
  getProjectById,
  getHomeHot,
  getHomeCarousel,
  getHomePicks,
  getHomeSuccess,
  getHomeNew,
  postProject,
  patchProjectStatus,
};
