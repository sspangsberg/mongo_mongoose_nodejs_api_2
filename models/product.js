const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let productSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 4, maxlength: 50 },
    description: { type: String },
    price: { type: Number },
    inStock: { type: Boolean }
  }  
);

module.exports = mongoose.model("product", productSchema);