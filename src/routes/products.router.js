const router = require('express').Router();
const { getAllProducts, createProduct } = require('../controllers/product');
const passportCheck = require('../middlewares/passportCheck');

router.get('/', passportCheck, getAllProducts).post('/', createProduct);

module.exports = router;
