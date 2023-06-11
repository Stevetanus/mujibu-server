// const httpStatus = require('http-status');
const { Team } = require('../models');
const ApiError = require('../utils/ApiError');

const createTeam = async (userBody) => {
  const {
    teamName,
    teamIntroduction,
    teamAvatar,
    representativeName,
    representativeMobile,
    representativePhone,
    representativeEmail,
    companyName,
    companyPhone,
    companyRegistrationNumber,
    companyAddress,
    socialWebsite,
    socialEmail,
    socialFb,
    socialLine,
    socialIg,
    socialYoutube,
  } = userBody.projectTeam;
  const team = {
    teamName,
    teamIntroduction,
    teamAvatar,
    representativeName,
    representativeMobile,
    representativePhone,
    representativeEmail,
    companyName,
    companyPhone,
    companyRegistrationNumber,
    companyAddress,
    socialWebsite,
    socialEmail,
    socialFb,
    socialLine,
    socialIg,
    socialYoutube,
  };
  const newTeam = new Team(team);
  return newTeam
    .save()
    .then((result) => {
      return { ...userBody, projectTeam: result.id };
    })
    .catch((err) => {
      console.error(err);
      throw new ApiError('There was an error saving the team.'); // 拋出一個新的 ApiError
    });
};

const teamFindById = async (userBody) => {
  const team = await Team.findById(userBody.project.projectTeam);
  team.projectId = userBody.project._id;
  await team.save();
};

module.exports = {
  createTeam,
  teamFindById,
};
