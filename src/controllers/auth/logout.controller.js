const User = require('../../models/user.model');

const logOut = (req, res, next) => {
	const { _id: id } = req.user;

	const sendResponse = () => {
		res.json({
			status: 'seccess',
		});
	};

	User.findByIdAndUpdate(id, { $unset: { token: '' } })
		.then(sendResponse)
		.catch(err => {
			res.status(400);
			next(err);
		});
};

module.exports = logOut;
