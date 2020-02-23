const User = require('../../models/user.model');
const { jwtSecretKey } = require('../../config/config');

const { Strategy, ExtractJwt } = require('passport-jwt');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

opts.secretOrKey = jwtSecretKey;

module.exports = new Strategy(opts, (jwtPayload, done) => {
	return done(jwtPayload.id);

	// User.findOne({ _id: jwtPayload.id }, (err, user) => {

	// 	console.log('jwtPayload', jwtPayload);

	// 	if (err) return done(err, false);

	// 	if (user) return done(null, user);

	// 	return done(null, false);
	// });
});
