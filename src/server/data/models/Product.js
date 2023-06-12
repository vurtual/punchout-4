const mongoose = require('mongoose');

const depotSchema = new mongoose.Schema({
  warehouse: {
    type: String,
  },
  qtyOnHand: {
    type: Number,
    validate: {
      validator: function (value) {
        return Number.isInteger(value) && value > 0;
      },
      message: 'Value must be a positive integer.',
    },
  },
  enterDate: { type: Date },
  arpSupplier: {
    type: Number,
    validate: {
      validator: function (value) {
        return Number.isInteger(value) && value > 0;
      },
      message: 'Value must be a positive integer.',
    },
  },
});

const productSchema = new mongoose.Schema({
  partCode: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
  },
  productStatus: {
    type: String,
  },
  productTerms: {
    type: Boolean,
  },
  productType: {
    type: String,
  },
  pricePer: {
    type: Number,
    required: true,
  },
  priceBasis: {
    type: String,
    required: true,
  },
  stockUnit: {
    type: String,
  },
  oldPartCode: {
    type: String,
  },
  depot: {
    type: [depotSchema],
  },
  luckinsData: {
    itemCode: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return Number.isInteger(value) && value > 0;
        },
        message: 'Value must be a positive integer.',
      },
    },
    product: {
      type: String,
    },
    supplierCode: {
      type: Number,
      validate: {
        validator: function (value) {
          return Number.isInteger(value) && value > 0;
        },
        message: 'Value must be a positive integer.',
      },
    },
    catalogueNumber1: {
      type: String,
    },
    catalogueNumber2: {
      type: String,
    },
    productRangeCode: {
      type: String,
    },
    productRangeMajor: {
      type: String,
    },
    productRangeMinor: {
      type: String,
    },
    brandName: {
      type: String,
    },
    materialColourFinish: {
      type: String,
    },
    vatCode: {
      type: Number,
      validate: {
        validator: function (value) {
          return Number.isInteger(value) && value > 0;
        },
        message: 'Value must be a positive integer.',
      },
    },
    priceQuantity: {
      type: Number,
      validate: {
        validator: function (value) {
          return Number.isInteger(value) && value > 0;
        },
        message: 'Value must be a positive integer.',
      },
    },
    priceUnit: {
      type: String,
    },
    pricing: {
      type: [
        {
          price: {
            type: Number,
            validate: {
              validator: function (value) {
                return value > 0;
              },
              message: 'Value must be a positive integer.',
            },
          },
          priceBreak: {
            type: Number,
            validate: {
              validator: function (value) {
                return Number.isInteger(value) && value > 0;
              },
              message: 'Value must be a positive integer.',
            },
          },
        },
      ],
    },
    shortDescription: {
      type: String,
    },
  },
});

const Product = mongoose.model('products', productSchema);

module.exports = { Product, ProductSchema: productSchema };
