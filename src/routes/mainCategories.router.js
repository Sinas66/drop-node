const router = require('express').Router();
const {
	getMainCategory,
	createMainCategory,
} = require('../controllers/mainCategory');

router.get('/', getMainCategory).post('/', createMainCategory);

module.exports = router;
