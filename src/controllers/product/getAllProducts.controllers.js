const Product = require('../../models/product.model');

const getAllProducts = (req, res, next) => {
	Product.find()
		.then(products => res.json({ status: 'succes', products }))
		.catch(err => {
			res.status(400);
			next(err);
		});
};

module.exports = getAllProducts;
