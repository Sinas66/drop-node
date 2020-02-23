const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductsSchema = new Schema({
  title: String
});

const Products = mongoose.model("Products", ProductsSchema);

module.exports = Products;
