const passport = require('passport');
const User = require('../models/user.model');

const passportCheck = (req, res, next) => {
	passport.authenticate(
		'jwt',
		{
			session: false,
		},
		id => {
			if (!id) {
				res.status(401);
				const error = new Error('Unauthorized');
				next(error);
			} else {
				const { authorization } = req.headers;
				User.findOne({ _id: id, token: authorization })
					.then(userFromDb => {
						if (!userFromDb) {
							res
								.status(401)
								.json({ status: 'error', message: 'token doesnt exist' });
							return;
						}
						req.user = userFromDb;
						next();
					})
					.catch(next);
			}
		},
	)(req, res);
};

module.exports = passportCheck;
