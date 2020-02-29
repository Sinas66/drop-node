const Category = require('../../models/category.model');

const getCategories = (req, res, next) => {
	Category.paginate({}, { select: { __v: 0, createdAt: 0, updatedAt: 0 } })
		.then(categories => res.json({ status: 'success', categories }))
		.catch(err => {
			res.status(400);
			next(err);
		});
};
module.exports = getCategories;
