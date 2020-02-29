const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
	{
		label: String,
		mainCategory: {
			type: Schema.Types.ObjectId,
			ref: 'MainCategory',
		},
	},
	{
		timestamps: true,
	},
);

CategorySchema.plugin(mongoosePaginate);
const Category = mongoose.model('Categories', CategorySchema);

module.exports = Category;
