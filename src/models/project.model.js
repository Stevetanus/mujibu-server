const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const planSchema = new mongoose.Schema({
  // planOrders: {
  //   type: [mongoose.Schema.Types.ObjectId],
  //   ref: 'Orders',
  // }, //TODO foreign key(order id) 訂單id
  planName: {
    type: String,
    trim: true,
    default: '',
  }, // 方案名稱 *
  planType: {
    type: String,
    trim: true,
    default: '',
  }, // 方案類型 *
  planQuantity: {
    type: Number,
    default: 0,
  }, // 方案數量 *,
  planDiscountPrice: {
    type: Number,
    default: 0,
  }, // 方案特價金額 *
  planOriginalPrice: {
    type: Number,
    default: 0,
  }, // 方案原價金額 *
  planStartTime: {
    type: Date,
    default: null,
  }, // 開始時間 *,
  planEndTime: {
    type: Date,
    default: null,
  }, // 結束時間 *,
  planImage: {
    type: String,
    trim: true,
    default: '',
  }, // 方案圖片 *,
  planDescription: {
    type: String,
    trim: true,
    default: '',
  }, // 方案敘述 *
  otherNotes: {
    type: [String],
    default: [],
  }, // 其他備註
  planBackers: {
    type: Number,
    default: 0,
  },
  isRealProduct: {
    type: Boolean,
    default: true,
  }, // 是否有實體產品為回饋品 *
});

const withdrawSettingsSchema = mongoose.Schema(
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
    isAgreeTerms: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const shippingSettingsSchema = mongoose.Schema(
  {
    shippingSwitch: {
      type: Boolean,
      default: false,
    }, // 不需物流設定
    deliveryInfo: {
      deliverySwitch: {
        type: Boolean,
        default: false,
      }, // 不需物流設定
      deliveryFee: {
        type: Number,
        default: 100,
      }, // 運費
      multiProductCheckout: {
        type: Number,
        enum: [0, 1], // 0: 僅計算一次 // 1:將總運費相加
        default: 0,
      }, // 多商品結帳
      freeShippingConditions: {
        type: Number,
        enum: [0, 1], // 0: 無減免條件 // 1:達到免運金額時免運
        default: 1,
      }, // 運費減免條件
      freeShippingPrice: {
        type: Number,
        default: 1000,
      }, // 運費減免金額
      senderName: {
        type: String,
        trim: true,
        default: '',
      }, // 寄件人姓名
      senderPhone: {
        type: String,
        trim: true,
        default: '',
      }, // 寄件人電話
      senderAddress: {
        type: String,
        trim: true,
        default: '',
      }, // 寄件人地址
      // senderPostalCode: {
      //   type: String,
      //   trim: true,
      //   default: '',
      // }, // 寄件人郵遞區號
    },
    cvsInfo: {
      cvsSwitch: {
        type: Boolean,
        default: false,
      }, // 不需物流設定
      deliveryFee: {
        type: Number,
        default: 70,
      }, // 運費
      multiProductCheckout: {
        type: Number,
        enum: [0, 1], // 0: 僅計算一次 // 1:將總運費相加
        default: 0,
      }, // 多商品結帳
      freeShippingConditions: {
        type: Number,
        enum: [0, 1], // 0: 無減免條件 // 1:達到免運金額時免運
        default: 1,
      }, // 運費減免條件
      freeShippingPrice: {
        type: Number,
        default: 1000,
      }, // 運費減免金額
      cvsName: {
        type: Number,
        enum: [0, 1, 2], // 0: 7-11 1: 全家 2: 萊爾富
        default: 0,
      }, // 超商名稱,
    },
  },
  { _id: false }
);

const projectSchema = mongoose.Schema(
  {
    projectProposer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // 關聯的User模型
    },
    projectPlans: {
      type: [planSchema],
    },
    projectTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
    },
    latestNews: {
      type: Array,
      default: [],
    },
    faqs: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
    projectOrders: {
      type: Array,
      default: [],
    },
    projectRefunds: {
      type: Array,
      default: [],
    },
    projectFollowers: {
      type: Array,
      default: [],
    },
    projectType: {
      // 專案形式
      // 0 實體產品類
      // 1 虛擬計畫類
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    projectForm: {
      // 專案性質
      // 0 一般專案
      // 1 長期販售
      // 2 成功專案
      // 3 失敗專案
      type: Number,
      enum: [0, 1, 2, 3],
      default: 0,
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
      default: 0,
    },
    projectCategory: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5],
      default: 0,
    },
    projectName: {
      type: String,
      trim: true,
      default: '',
    },
    projectImage: {
      type: String,
      trim: true,
      default: '',
    },
    projectDescription: {
      type: String,
      trim: true,
      default: '',
    },
    goalAmount: {
      type: Number,
      default: 0,
    },
    currentAmount: {
      type: Number,
      default: 0,
    },
    startTime: {
      type: Date,
      default: null,
    },
    endTime: {
      type: Date,
      default: null,
    },
    officialPage: {
      type: String,
      trim: true,
      default: '',
    },
    fanPage: {
      type: String,
      trim: true,
    },
    attachmentLink: {
      type: String,
      trim: true,
      default: '',
    },
    projectContent: {
      type: String,
      trim: true,
      default: '',
    },
    projectScore: {
      type: Number,
      default: 0,
    },
    projectBackers: {
      type: Number,
      default: 0,
    },
    projectUrl: {
      type: String,
      trim: true,
      default: '',
    },
    carousel: {
      type: Boolean,
      default: false,
    },
    withdrawSettings: {
      type: withdrawSettingsSchema,
    },
    shippingSettings: {
      type: shippingSettingsSchema,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

projectSchema.virtual('currentAmountPercentage').get(function () {
  return Math.ceil((this.currentAmount / this.goalAmount) * 100);
});

// add plugin that converts mongoose to json
projectSchema.plugin(toJSON);
projectSchema.plugin(paginate);
// Add the toJSON plugin which also ensures to include the virtual properties
projectSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    const transformed = { ...ret };
    delete transformed.id;
    return transformed;
  },
});

projectSchema.statics.isProjectNameTaken = async function (projectName, excludeUserId) {
  const project = await this.findOne({ projectName, _id: { $ne: excludeUserId } });
  return !!project;
};

/**
 * @typedef Project
 */
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
