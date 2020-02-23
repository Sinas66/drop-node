const passport = require('passport');

const login = (req, res) => {
	const sendResponse = user => {
		res.json({
			status: 'success',
			user,
		});
	};

	passport.authenticate(
		'local',
		{
			session: false,
		},
		(err, user, info) => {
			if (err || !user) {
				res.status(400).json({
					status: 'error',
					error: info || 'Login failed',
				});
				return;
			}
			req.login(
				user,
				{
					session: false,
				},
				err => {
					if (err) res.send(err);

					sendResponse(user);
				},
			);
		},
	)(req, res);
};

module.exports = login;
