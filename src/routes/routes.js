const router = require('express').Router();
const productsRouter = require('./products.router');
const authRouter = require('./auth.router');

router
	.use('/products', productsRouter)
	.use('/auth', authRouter)
	.all('*', (req, res) => {
		res.send('Hello world');
	});

module.exports = router;
