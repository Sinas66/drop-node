const router = require('express').Router();

const passportCheck = require('../middlewares/passportCheck');

const {
	login,
	register,
	logout,
	getLogin,
	getRegister,
} = require('../controllers/auth');

router
	.get('/register', getRegister)
	.post('/register', register)
	.get('/login', getLogin)
	.post('/login', login)
	.post('/logout', passportCheck, logout);

module.exports = router;
