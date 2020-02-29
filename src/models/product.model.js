const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductsSchema = new Schema(
	{
		title: { type: String, required: true },
		category: {
			type: Schema.Types.ObjectId,
			ref: 'Categories',
		},
		maincategory: {
			type: Schema.Types.ObjectId,
			ref: 'MainCategory',
		},
	},
	{
		timestamps: true,
	},
);

const Products = mongoose.model('Products', ProductsSchema);

module.exports = Products;
