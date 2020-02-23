const User = require('../../models/user.model');

const localStrategy = require('./localStrategy');
const jwtStrategy = require('./jwtStrategy');

module.exports = function(passport) {
	passport.use(localStrategy).use(jwtStrategy);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});
};
