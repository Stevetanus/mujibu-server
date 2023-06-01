const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const teamSchema = mongoose.Schema(
  {
    projectId: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: 'Project',
    },
    teamName: {
      type: String,
      required: true,
      trim: true,
    },
    teamIntroduction: {
      type: String,
      required: true,
      trim: true,
    },
    teamAvatar: {
      type: String,
      trim: true,
      default: '',
    },
    representativeName: {
      type: String,
      required: true,
      trim: true,
    },
    representativeMobile: {
      type: String,
      required: true,
      trim: true,
    },
    representativePhone: {
      type: String,
      trim: true,
      default: '',
    },
    representativeEmail: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
      default: '',
    },
    companyPhone: {
      type: String,
      trim: true,
      default: '',
    },
    companyRegistrationNumber: {
      type: String,
      trim: true,
      default: '',
    },
    companyAddress: {
      type: String,
      trim: true,
      default: '',
    },
    socialWebsite: {
      type: String,
      trim: true,
      default: '',
    },
    socialEmail: {
      type: String,
      required: true,
      trim: true,
    },
    socialFb: {
      type: String,
      trim: true,
      default: '',
    },

    socialLine: {
      type: String,
      trim: true,
      default: '',
    },
    socialIg: {
      type: String,
      trim: true,
      default: '',
    },
    socialYoutube: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
teamSchema.plugin(toJSON);
teamSchema.plugin(paginate);

/**
 * @typedef Team
 */
const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
