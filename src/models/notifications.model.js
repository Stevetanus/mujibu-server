// 許願 備存
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const notificationSchema = mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    notificationTitle: {
      type: String,
      trim: true,
      required: true,
      default: '',
    },
    notificationType: {
      type: Number,
      enum: [0, 1, 2, 3, 4], // 0 最新消息 1 留言通知 2 結案通知 3 訂單通知 4 審核通知
      required: true,
      default: 0,
    },
    notificationCategory: {
      type: Number,
      enum: [0, 1, 2], // 0 orders 1 follows 2 projects
      required: true,
      default: 0,
    },
    notificationContent: {
      type: String,
      trim: true,
      default: '',
    },
    notificationLink: {
      type: String,
      trim: true,
      required: true,
      default: '',
    },
    isRead: {
      type: Boolean,
      required: true,
      default: true,
    },
    receiverType: {
      type: Number,
      enum: [0, 1, 2], // 0 管理員 1 提案者 2 贊助者
      required: true,
      default: 0,
    },
    receivers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Project',
    },
    senderType: {
      type: Number,
      enum: [0, 1, 2], // 0 管理員 1 提案者 2 贊助者
      default: 0,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
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
