const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  orderData: {
    type: Array,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Orders", orderSchema);
