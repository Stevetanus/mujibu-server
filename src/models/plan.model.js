// 目前與專案合併了 備存
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

// 回饋方案
const planSchema = mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    planName: {
      type: String,
      required: true,
      trim: true,
    }, // 方案名稱 *
    planType: {
      type: String,
      required: true,
      trim: true,
    }, // 方案類型 *
    planAmount: {
      type: Number,
      required: true,
    }, // 方案數量 *
    planPrice: {
      type: Number,
      default: 0,
    }, // 未來售價
    planImage: {
      type: String,
      required: true,
      trim: true,
      default: '',
    }, // 方案圖片 *
    planQuantity: {
      type: Number,
      required: true,
      default: 0,
    }, // 方案數量 *
    planStartTime: {
      type: Date,
      required: true,
    }, // 開始時間 *
    planEndTime: {
      type: Date,
      required: true,
    }, // 結束時間 *
    planDescription: {
      type: String,
      trim: true,
      required: true,
    }, // 方案敘述 *
    planNotes: {
      type: [String],
      default: [],
    }, // 其他備註
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
planSchema.plugin(toJSON);
planSchema.plugin(paginate);

/**
 * @typedef Plan
 */
const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
