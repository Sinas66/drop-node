const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
	const errors = validationResult(req).array();
	if (errors.length) {
		return res.status(422).json({ status: 'error', errors });
	}
	next();
};
