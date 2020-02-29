const Product = require('../../models/product.model');

const ctrateProduct = (req, res, next) => {
	const { title } = req.body;

	const product = new Product({ title });

	product
		.save()
		.then(saved => {
			res.json({ status: 'success', product: saved });
		})
		.catch(err => {
			res.status(400);
			next(err);
		});
};

module.exports = ctrateProduct;
