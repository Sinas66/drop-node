const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const MainCategorySchema = new Schema(
	{
		label: String,
		categories: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Categories',
			},
		],
	},
	{
		timestamps: true,
	},
);

MainCategorySchema.plugin(mongoosePaginate);
const MainCategory = mongoose.model('MainCategory', MainCategorySchema);

module.exports = MainCategory;
