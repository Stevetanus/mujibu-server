// 目前與專案合併了 備存
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

// Create the shipping_rules schema
const shippingRulesSchema = mongoose.Schema(
  {
    homeDeliverySwitch: { type: Boolean, default: false },
    shippingFee: { type: Number, default: 100 },
    multiple_products_checkout: { type: Boolean, default: false },
    shipping_fee_reduction: { type: Number, default: 0 },
    convenience_store_pickup: { type: Boolean, default: false },
  },
  { _id: false }
); // We don't need an id for this sub-schema

// Create the sender_info schema
const senderInfoSchema = mongoose.Schema(
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
    address: {
      type: String,
      trim: true,
      default: '',
    },
    postal_code: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { _id: false }
); // We don't need an id for this sub-schema

const shippingSchema = mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Project',
    },
    shippingRules: shippingRulesSchema,
    senderInfo: senderInfoSchema,
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
shippingSchema.plugin(toJSON);
shippingSchema.plugin(paginate);

/**
 * @typedef Shipping
 */
const Shipping = mongoose.model('Shipping', shippingSchema);

module.exports = Shipping;
