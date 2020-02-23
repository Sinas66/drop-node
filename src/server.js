require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const chalk = require('chalk');

const routes = require('./routes/routes');

const errorHandler = require('./utils/errorHandler');
const isDev = process.env.NODE_ENV !== 'production';

const { apiPATH, apiVersion } = require('./config/config');

const startServer = port => {
	isDev &&
		app.use(
			morgan(':method :url :status :res[content-length] - :response-time ms'),
		);

	app
		.use(express.urlencoded({ extended: false })) // Добавляем query в url
		.use(express.json()) // Добавляем body в req

		.use(cookieParser())
		.use(
			session({
				secret: 'super-secret-key',
				resave: false,
				saveUninitialized: false,
				cookie: { maxAge: 60000 },
			}),
		)
		// security
		.use(cors('*'))
		.disable('x-powered-by');

	// Passport
	require('./services/passport/passport')(passport);
	app
		.use(passport.initialize())
		.use(passport.session())

		// routes
		.use(`/${apiPATH}/${apiVersion}`, routes)
		.use('/', (req, res) =>
			res.json({
				status: 'success',
				message: `Basic url for api is /${apiPATH}/${apiVersion}`,
			}),
		)
		.use(errorHandler)
		.listen(port, () => {
			console.log(
				`App listening on port ${chalk.yellow(`http://localhost:${port}`)} !`,
			);
			console.log(
				`Api route is ${chalk.blue(
					`http://localhost:${port}/${apiPATH}/${apiVersion}`,
				)}`,
			);
		});
};

module.exports = startServer;
