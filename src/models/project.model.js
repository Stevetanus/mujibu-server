const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const projectSchema = mongoose.Schema(
  {
    // teamId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   trim: true,
    //   ref: 'Team',
    // },
    proposer: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
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
    type: {
      type: String,
      enum: ['0', '1', '2', '3'],
    },
    status: {
      type: String,
      enum: ['0', '1', '2', '3', '4', '5', '6'],
    },
    form: {
      type: String,
      enum: ['0', '1'],
    },
    category: {
      type: String,
      enum: ['0', '1', '2', '3', '4', '5'],
    },
    fundraisingGoal: {
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
    url: {
      type: String,
      trim: true,
    },
    content: {
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
  return Math.ceil((this.currentAmount / this.fundraisingGoal) * 100);
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
