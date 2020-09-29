const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let product = new Schema(
  {
    name: { type: String, required: true, minlength: 4, maxlength: 50 },
    description: { type: String },
    price: { type: Number },
    inStock: { type: Boolean }
  },
  { collection: "Products" }
);

module.exports = mongoose.model("product", product);