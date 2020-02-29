const User = require('../../models/user.model');
const login = require('./login.controller');

const register = (req, res, next) => {
	const { email, password } = req.body;

	User.findOne({ email })
		.then(userWithEmail => {
			if (userWithEmail) {
				res.status(409);
				const error = new Error('user with this email already exist');
				next(error);
			} else {
				const user = new User({ email, password });
				user
					.save()
					.then(() => login(req, res))
					.catch(err => {
						res.status(400);
						next(err);
					});
			}
		})
		.catch(err => {
			res.status(400);
			next(err);
		});
};

module.exports = register;
