const Category = require('../../models/category.model');

const getCategory = (req, res, next) => {
	const { label, mainCategory } = req.body;

	const newCategory = new Category({ label, mainCategory });

	newCategory
		.save()
		.then(category => res.json({ status: 'success', category }))
		.catch(err => {
			res.status(400);
			next(err);
		});
};
module.exports = getCategory;
