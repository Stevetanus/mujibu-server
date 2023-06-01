const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

// Create the shipping_rules schema
const representativeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: '',
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    email: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { _id: false }
); // We don't need an id for this sub-schema

// Create the sender_info schema
const withdrawAccountSchema = mongoose.Schema(
  {
    bankName: {
      type: String,
      trim: true,
      default: '',
    },
    accountNumber: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { _id: false }
); // We don't need an id for this sub-schema

const withdrawSchema = mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Project',
    },
    representative: representativeSchema,
    withdrawAccount: withdrawAccountSchema,
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
withdrawSchema.plugin(toJSON);
withdrawSchema.plugin(paginate);

/**
 * @typedef Withdraw
 */
const Withdraw = mongoose.model('Withdraw', withdrawSchema);

module.exports = Withdraw;
