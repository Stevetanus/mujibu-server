const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const projectProposerSchema = {
  // 關聯user id
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // 關聯的User模型
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
};

const planSchema = new mongoose.Schema({
  planName: String,
  planType: String,
  planQuantity: Number,
  planDiscountPrice: String,
  planOriginalPrice: String,
  planStartTime: Date,
  planEndTime: Date,
  planImage: String,
  planDescription: String,
  otherNotes: [String],
  isRealProduct: Boolean,
});

const withdrawSettingsSchema = {
  bankName: String,
  bankAccount: String,
};

const shippingSettingsSchema = {
  shippingSwitch: Boolean,
  deliveryInfo: {
    deliverySwitch: Boolean,
    deliveryFee: Number,
    multiProductCheckout: Number,
    freeShippingConditions: Number,
    freeShippingPrice: Number,
    senderName: String,
    senderPhone: String,
    senderAddress: String,
  },
  cvsInfo: {
    cvsSwitch: Boolean,
    deliveryFee: Number,
    multiProductCheckout: Number,
    freeShippingConditions: Number,
    freeShippingPrice: Number,
    cvsNamet: Number,
  },
};

const projectSchema = mongoose.Schema(
  {
    projectProposer: {
      type: projectProposerSchema,
      required: true,
    },
    projectPlans: {
      type: [planSchema],
      require: true,
    },
    projectTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    },
    latestNews: {
      type: Array,
    },
    faqs: {
      type: Array,
    },
    comments: {
      type: Array,
    },
    projectOrders: {
      type: Array,
    },
    projectRefunds: {
      type: Array,
    },
    projectFollowers: {
      type: Array,
    },
    projectType: {
      // 專案形式
      // 0 實體產品類
      // 1 虛擬計畫類
      type: Number,
      enum: [0, 1],
      required: true,
    },
    projectForm: {
      // 專案性質
      // 0 一般專案
      // 1 長期販售
      // 2 成功專案
      // 3 失敗專案
      type: Number,
      enum: [0, 1, 2, 3],
      required: true,
    },
    projectStatus: {
      // 專案狀態
      // 0 提案
      // 1 審核
      // 2 退件
      // 3 募資中
      // 4 募資成功
      // 5 募資失敗
      // 6 退款中
      // 7 回饋品準備中
      // 8 回饋品寄送完成
      // 9 結案
      type: Number,
      enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      required: true,
    },
    projectCategory: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5],
      required: true,
    },
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    projectImage: {
      type: String,
      required: true,
      trim: true,
    },
    projectDescription: {
      type: String,
      required: true,
      trim: true,
    },
    goalAmount: {
      type: Number,
      required: true,
    },
    currentAmount: {
      type: Number,
      default: 0,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    officialPage: {
      type: String,
      trim: true,
    },
    fanPage: {
      type: String,
      trim: true,
    },
    attachmentLink: {
      type: String,
      trim: true,
    },
    projectContent: {
      type: String,
      required: true,
      trim: true,
    },
    projectScore: {
      type: Number,
    },
    projectBackers: {
      type: Number,
      default: 0,
    },
    projectUrl: {
      type: String,
      trim: true,
    },
    carousel: {
      type: Boolean,
      required: true,
    },
    withdrawSettings: {
      type: withdrawSettingsSchema,
      required: false,
      default: {
        bankName: '',
        bankAccount: '',
      },
    },
    shippingSettings: {
      type: shippingSettingsSchema,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.virtual('currentAmountPercentage').get(function () {
  return Math.ceil((this.currentAmount / this.goalAmount) * 100);
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
