const Product = require('../../models/product.model');

const getAllProducts = (req, res) => {
	Product.find()
		.then(products => res.json({ status: 'succes', products }))
		.catch(err => res.status(400).json({ status: 'error', err: err.message }));
};

module.exports = getAllProducts;
