// const httpStatus = require('http-status');
const { faker } = require('@faker-js/faker');
const { Project } = require('../models');
// const ApiError = require('../utils/ApiError');

const generateRandomProjects = (numProjects) => {
  const projects = [];
  for (let i = 0; i < numProjects; i += 1) {
    const currentAmount = faker.number.int({ min: 0, max: 10000000 / 2 });
    const targetAmount = faker.number.int({ min: currentAmount, max: 10000000 });
    const project = new Project({
      proposer: faker.person.fullName(),
      projectName: `Balance衡壓坐墊｜市場唯一衡壓概念健康坐墊，坐出 Q 軟好體態！${i}`,
      description: faker.lorem.paragraph(),
      projectVisual: faker.image.url(),
      startTime: faker.date.past(),
      endTime: faker.date.future(),
      projectType: faker.number.int({ min: 1, max: 4 }).toString(),
      projectStatus: faker.number.int({ min: 1, max: 7 }).toString(),
      projectForm: faker.number.int({ min: 1, max: 2 }).toString(),
      category: faker.number.int({ min: 1, max: 6 }).toString(),
      targetAmount,
      backers: faker.number.int({ min: 0, max: 10000 }),
      currentAmount,
      projectUrl: faker.internet.url(),
      projectContent: `<div>${faker.lorem.paragraph()}</div>`,
      score: faker.number.int({ min: 1, max: 5 }),
      carousel: faker.datatype.boolean(),
      attachmentLink: '',
    });
    projects.push(project);
  }
  return projects;
};

const getProjects = async (query) => {
  // page 預設get頁數
  // perPage 預設取得資料筆數
  const { projectType, category, sortBy, page = 1, perPage = 20 } = query;
  let totalQuery = {};
  const pipeline = [];
  // filter
  if (category) {
    pipeline.push({ $match: { category } });
    totalQuery = {
      ...totalQuery,
      category,
    };
  }
  if (projectType) {
    pipeline.push({ $match: { projectType } });
    totalQuery = {
      ...totalQuery,
      projectType,
    };
  }
  // sort
  if (sortBy === 'endTime') {
    // 專案結束 排序舊 -> 新
    pipeline.push({ $sort: { endTime: 1 } });
  } else if (sortBy === 'targetAmount') {
    pipeline.push({ $sort: { targetAmount: -1 } });
  } else {
    // 專案開始 排序新 -> 舊
    pipeline.push({ $sort: { startTime: -1 } });
  }
  // pagination
  const skipCount = (page - 1) * perPage;
  pipeline.push({ $skip: skipCount });
  pipeline.push({ $limit: perPage });

  const data = await Project.aggregate(pipeline).exec();
  const total = await Project.countDocuments(totalQuery);

  return {
    data,
    total,
  };
};

const postFakeProjects = async (query) => {
  try {
    // 生成count筆亂數 projects 資料
    const { count } = query;
    const randomProjects = generateRandomProjects(count || 1);
    const result = await Project.create(randomProjects);
    return result;
  } catch (error) {
    throw new Error('postFakeProjects api error: ', error);
  }
};

const queryProjectsHot = async (filter, options) => {
  const projects = await Project.paginate(filter, options); // 使用 paginate 方法
  return projects;
};
const queryProjectsCarousel = async (filter, options) => {
  const projects = await Project.paginate(filter, options); // 使用 paginate 方法
  return projects;
};
const queryProjectsPicks = async (filter, options) => {
  const projectsHot = await Project.paginate(filter, options); // 使用 paginate 方法
  return projectsHot;
};
const queryProjectsSuccess = async (filter, options) => {
  const projects = await Project.paginate(filter, options); // 使用 paginate 方法
  return projects;
};
const queryProjectsNew = async (filter, options) => {
  const projects = await Project.paginate(filter, options); // 使用 paginate 方法
  return projects;
};

module.exports = {
  getProjects,
  postFakeProjects,
  queryProjectsHot,
  queryProjectsCarousel,
  queryProjectsPicks,
  queryProjectsSuccess,
  queryProjectsNew,
};
