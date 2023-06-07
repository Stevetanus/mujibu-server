const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const projectSchema = mongoose.Schema(
  {
    // projectTeamId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   trim: true,
    //   ref: 'Team',
    // },
    proposer: {
      type: String,
    },
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    projectVisual: {
      type: String,
      required: true,
      trim: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    projectType: {
      type: Number,
      enum: [1, 2, 3, 4],
    },
    projectStatus: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7],
    },
    projectForm: {
      type: Number,
      enum: [1, 2],
    },
    category: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6],
    },
    targetAmount: {
      type: Number,
      required: true,
    },
    backers: {
      type: Number,
      default: 0,
    },
    currentAmount: {
      type: Number,
      default: 0,
    },
    projectUrl: {
      type: String,
      trim: true,
    },
    projectContent: {
      type: String,
      required: true,
      trim: true,
    },
    score: {
      type: Number,
    },
    carousel: {
      type: Boolean,
    },
    attachmentLink: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.virtual('currentAmountPercentage').get(function () {
  return Math.ceil((this.currentAmount / this.targetAmount) * 100);
});

// add plugin that converts mongoose to json
projectSchema.plugin(toJSON);
projectSchema.plugin(paginate);
// Add the toJSON plugin which also ensures to include the virtual properties
projectSchema.set('toJSON', { virtuals: true });
/**
 * @typedef Project
 */
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
