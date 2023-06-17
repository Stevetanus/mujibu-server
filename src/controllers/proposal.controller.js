const httpStatus = require('http-status');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { proposalService, userService } = require('../services');

const getProposal = catchAsync(async (req, res) => {
  const proposal = await proposalService.getProposalById(req.params.userId);
  if (!proposal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Proposal not found');
  }
  res.send({ status: 'Success', data: proposal });
});
const postProposal = catchAsync(async (req, res) => {
  const user = await userService.queryProjectProposer(req.project.projectProposer);
  res
    .status(httpStatus.CREATED)
    .send({ status: 'Success', data: { ...req.body, projectPlans: req.project.projectPlans, projectProposer: user } });
});

module.exports = {
  getProposal,
  postProposal,
};
