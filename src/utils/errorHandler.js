const errorHandler = (err, req, res, next) => {
	res.status(500).json({
		status: 'error',
		message: 'something goes wrong! server handleError',
	});
	next();
};

module.exports = errorHandler;
