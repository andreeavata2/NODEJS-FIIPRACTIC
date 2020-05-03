const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
  {
    products: {
      required: true,
      type: Array
    },
    userId: {
      required: true,
      type: String
    },
    value: {
      require: true,
      type: Number
    }
  },
  {
    timestamps: true
  }
);

const Cart = model("carts", cartSchema);

module.exports = Cart;
