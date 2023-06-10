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

const getHomeHot = catchAsync(async (req, res) => {
  const filter = { projectType: '0' }; // 搜尋條件
  const options = {
    sortBy: 'projectBackers:desc', // 排序
    limit: 6, // 取前 6 筆
    page: 1, // 頁數
  };
  const { data } = await projectService.queryProjectsHot(filter, options);
  res.send({ status: 'Success', data });
});

const getHomeCarousel = catchAsync(async (req, res) => {
  const filter = { carousel: true }; // 搜尋條件
  const options = {
    // sortBy: 'backers:desc', // 排序
    limit: 6, // 取前 6 筆
    page: 1, // 頁數
  };
  const { data } = await projectService.queryProjectsCarousel(filter, options);
  res.send({ status: 'Success', data });
});

const getHomePicks = catchAsync(async (req, res) => {
  const filter = { projectType: '1' }; // 搜尋條件
  const options = {
    sortBy: 'projectScore:desc', // 排序
    limit: 6, // 取前 6 筆
    page: 1, // 頁數
  };
  const { data } = await projectService.queryProjectsPicks(filter, options);
  res.send({ status: 'Success', data });
});

const getHomeSuccess = catchAsync(async (req, res) => {
  const filter = { projectType: '2' }; // 搜尋條件
  const options = {
    sortBy: 'currentAmountPercentage:desc', // 排序
    limit: 6, // 取前 6 筆
    page: 1, // 頁數
  };
  const { data } = await projectService.queryProjectsSuccess(filter, options);
  res.send({ status: 'Success', data });
});

const getHomeNew = catchAsync(async (req, res) => {
  const filter = { projectType: '0' }; // 搜尋條件
  const options = {
    sortBy: 'startTime:desc', // 排序
    limit: 6, // 取前 6 筆
    page: 1, // 頁數
  };
  const { data } = await projectService.queryProjectsNew(filter, options);
  res.send({ status: 'Success', data });
});

module.exports = {
  postFakeProjects,
  getProjects,
  getHomeHot,
  getHomeCarousel,
  getHomePicks,
  getHomeSuccess,
  getHomeNew,
};
