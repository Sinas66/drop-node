const User = require('../../models/user.model');
const login = require('./login.controller');

const register = (req, res) => {
	const { email, password } = req.body;

	User.findOne({ email })
		.then(userWithEmail => {
			if (userWithEmail) {
				res.status(200).json({
					status: 'error',
					error: 'user with this email already exist',
				});
			} else {
				const user = new User({ email, password });
				user
					.save()
					.then(() => login(req, res))
					// .then(savedUser =>
					// 	res.json({ status: 'success', user: savedUser.getPublicFields() }),
					// )
					.catch(error =>
						res.status(400).json({ status: 'error', error: error.message }),
					);
			}
		})
		.catch(error =>
			res.status(400).json({ status: 'error', error: error.message }),
		);
};

module.exports = register;
