const router = require('express').Router();
const productsRouter = require('./products.router');
const mainCategoriesRouter = require('./mainCategories.router');
const categoriesRouter = require('./categories.router');

const authRouter = require('./auth.router');

router
	.use('/products', productsRouter)
	.use('/main-category', mainCategoriesRouter)
	.use('/category', categoriesRouter)

	.use('/auth', authRouter);

module.exports = router;
