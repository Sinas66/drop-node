const router = require('express').Router();
const { getCategory, createCategory } = require('../controllers/category');

router.get('/', getCategory).post('/', createCategory);

module.exports = router;
