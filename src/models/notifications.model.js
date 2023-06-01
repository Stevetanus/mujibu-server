projectId;
notificationTitle;
notificationType;
notificationCategory;
notificationContent;
notificationLink;
isRead;
receiverType;
receivers;
senderType;
senderId;

const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const notificationSchema = mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    planName: {
      type: String,
      trim: true,
      default: '',
    },
    planType: {
      type: String,
      trim: true,
      default: '',
    },
    planAmount: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    plan_visual: {
      type: String,
      trim: true,
      default: '',
    },
    limitAmount: {
      type: Number,
      default: 0,
    },
    planStartTime: {
      type: Date,
      required: true,
    },
    planEndTime: {
      type: Date,
      required: true,
    },
    planDescription: {
      type: String,
      trim: true,
      default: '',
    },
    planNote: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
notificationSchema.plugin(toJSON);
notificationSchema.plugin(paginate);

/**
 * @typedef Notification
 */
const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
