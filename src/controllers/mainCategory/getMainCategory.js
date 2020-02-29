const MainCategory = require('../../models/mainCategory.model');

const getMainCategories = (req, res, next) => {
	const populate = {
		path: 'categories',
		select: { __v: 0, createdAt: 0, updatedAt: 0 },
	};

	const options = {
		populate,
		select: { __v: 0 },
	};

	MainCategory.paginate({}, options)
		.then(mainCategories => res.json({ status: 'success', mainCategories }))
		.catch(err => {
			res.status(400);
			next(err);
		});
};
module.exports = getMainCategories;
