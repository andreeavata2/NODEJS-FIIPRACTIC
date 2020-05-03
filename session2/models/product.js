const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      required: true,
      type: String
    },
    price: {
      required: true,
      type: Number
    },
    image: {
      required: true,
      type: Object
    },
    stock: {
      type: Number,
      default: 0
    },
    categories: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true
  }
);

const Product = model("products", productSchema);

module.exports = Product;
