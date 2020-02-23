const login = require('./login.controller');
const register = require('./register.controller');
const logout = require('./logout.controller');
const getLogin = require('./getLogin.controller');
const getRegister = require('./getRegister.controller');

module.exports = {
	register,
	login,
	logout,
	getLogin,
	getRegister,
};
