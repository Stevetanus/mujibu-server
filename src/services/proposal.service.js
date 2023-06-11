// const httpStatus = require('http-status');
const { Team } = require('../models');
// const ApiError = require('../utils/ApiError');

const getProposalById = async (userId) => {
  return Team.findById(userId);
};

module.exports = {
  getProposalById,
};
