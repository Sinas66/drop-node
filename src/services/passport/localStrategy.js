const { Strategy } = require('passport-local');
const User = require('../../models/user.model');

module.exports = new Strategy(
	{
		usernameField: 'email',
		passwordField: 'password',
	},
	(email, password, cb) => {
		User.findOne({ email })
			.then(user => {
				if (!user) {
					return cb(null, false, {
						message: 'Incorrect email or password.',
					});
				}

				user
					.comparePassword(password)
					.then(result => {
						if (result) {
							user.getJWT();
							const userData = user.getPublicFields();
							return cb(null, userData);
						} else {
							return cb(null, false, {
								message: 'Incorrect email or password.',
							});
						}
					})
					.catch(() =>
						cb(null, false, {
							message: 'Incorrect email or password.',
						}),
					);
			})
			.catch(err => cb(err));
	},
);
