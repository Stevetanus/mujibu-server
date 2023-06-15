const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const teamSchema = mongoose.Schema(
  {
    projectId: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: 'Project',
    },
    teamName: {
      type: String,
      required: true,
      trim: true,
    }, // 團隊名稱 *
    teamIntroduction: {
      type: String,
      required: true,
      trim: true,
    }, // 團隊介紹 *
    teamAvatar: {
      type: String,
      trim: true,
      default: '',
    }, // 團隊圖片
    representativeName: {
      type: String,
      required: true,
      trim: true,
    }, // 代表人姓名 *
    representativeMobile: {
      type: String,
      required: true,
      trim: true,
    }, // 代表人手機號碼 *
    representativePhone: {
      type: String,
      required: true,
      trim: true,
    }, // 代表人市內電話*
    representativeEmail: {
      type: String,
      required: true,
      trim: true,
    }, // 代表人 Email*
    companyName: {
      type: String,
      trim: true,
      default: '',
    }, // 公司登記名稱
    companyPhone: {
      type: String,
      trim: true,
      default: '',
    }, // 公司電話
    companyRegistrationNumber: {
      type: String,
      trim: true,
      default: '',
    }, // 統一編號
    companyAddress: {
      type: String,
      trim: true,
      default: '',
    }, // 公司所在地
    socialWebsite: {
      type: String,
      trim: true,
      default: '',
    }, // 官方網站
    socialEmail: {
      type: String,
      required: true,
      trim: true,
    }, // 客服Email
    socialFb: {
      type: String,
      trim: true,
      default: '',
    }, // Facebook
    socialLine: {
      type: String,
      trim: true,
      default: '',
    }, // Line ID
    socialIg: {
      type: String,
      trim: true,
      default: '',
    }, // Instagram
    socialYoutube: {
      type: String,
      trim: true,
      default: '',
    }, // Youtube
    isTaiwan: {
      type: Boolean,
      default: false,
    },
    isAgreeTerms: {
      type: Boolean,
      default: false,
    },
    isOver18: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
teamSchema.plugin(toJSON);
teamSchema.plugin(paginate);

teamSchema.statics.isTeamNameTaken = async function (teamName, excludeUserId) {
  const team = await this.findOne({ teamName, _id: { $ne: excludeUserId } });
  return !!team;
};

/**
 * @typedef Team
 */
const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
