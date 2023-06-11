// const httpStatus = require('http-status');
// const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { teamService } = require('../services');

const postTeam = catchAsync(async (req, res, next) => {
  const team = await teamService.createTeam(req.body);
  req.team = team;
  next();
});

const updateTeamProjectId = catchAsync(async (req, res, next) => {
  const team = await teamService.teamFindById(req);
  req.team = team;
  next();
});

module.exports = {
  postTeam,
  updateTeamProjectId,
};
