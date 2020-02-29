const MainCategory = require('../../models/mainCategory.model');

const getMainCategory = (req, res, next) => {
	const { label, categories } = req.body;

	const newMainCategory = new MainCategory({ label, categories });

	newMainCategory
		.save()
		.then(mainCategory => res.json({ status: 'success', mainCategory }))
		.catch(err => {
			res.status(400);
			next(err);
		});
};
module.exports = getMainCategory;
