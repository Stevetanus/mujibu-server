const httpStatus = require('http-status');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { teamService } = require('../services');

const getTeam = catchAsync(async (req, res) => {
  const team = await teamService.getTeamById(req.params.teamId);
  if (!team) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Team not found');
  }
  res.send({ status: 'success', data: team });
});

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
  getTeam,
  postTeam,
  updateTeamProjectId,
};
