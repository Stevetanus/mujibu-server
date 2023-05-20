const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const projectSchema = mongoose.Schema(
  {
    team_id: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: 'Team',
    },
    project_visual: {
      type: String,
      trim: true,
    },
    project_name: {
      type: String,
      required: true,
      trim: true,
    },
    project_start_time: {
      type: Date,
      trim: true,
    },
    project_end_time: {
      type: Date,
      trim: true,
    },
    project_type: {
      type: String,
      enum: ['0', '1', '2', '3'],
    },
    project_status: {
      type: String,
      enum: ['0', '1', '2', '3', '4', '5', '6'],
    },
    project_form: {
      type: String,
      enum: ['0', '1'],
    },
    category: {
      type: String,
      enum: ['0', '1', '2', '3', '4', '5'],
    },
    target_amount: {
      type: Number,
    },
    backers: {
      type: Number,
    },
    current_amount: {
      type: Number,
    },
    current_amount_percentage: {
      type: Number,
    },
    project_url: {
      type: String,
      trim: true,
    },
    project_content: {
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
