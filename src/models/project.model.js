const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const projectSchema = mongoose.Schema(
  {
    projectTeamId: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: 'Team',
    },
    projectVisual: {
      type: String,
      trim: true,
    },
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    projectStartTime: {
      type: Date,
      trim: true,
    },
    projectEndTime: {
      type: Date,
      trim: true,
    },
    projectType: {
      type: String,
      enum: ['0', '1', '2', '3'],
    },
    projectStatus: {
      type: String,
      enum: ['0', '1', '2', '3', '4', '5', '6'],
    },
    projectForm: {
      type: String,
      enum: ['0', '1'],
    },
    category: {
      type: String,
      enum: ['0', '1', '2', '3', '4', '5'],
    },
    targetAmount: {
      type: Number,
    },
    backers: {
      type: Number,
    },
    currentAmount: {
      type: Number,
    },
    currentAmountPercentage: {
      type: Number,
    },
    projectUrl: {
      type: String,
      trim: true,
    },
    projectContent: {
      type: String,
      trim: true,
    },
    score: {
      type: Number,
    },
    carousel: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
projectSchema.plugin(toJSON);
projectSchema.plugin(paginate);

/**
 * @typedef Project
 */
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
