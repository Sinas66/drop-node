require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const chalk = require('chalk');

const routes = require('./routes/routes');

const errorHandler = require('./utils/errorHandler');
const notFound = require('./utils/notFound');
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
		.use(helmet())
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
		.use(cors('*'));

	// Passport
	require('./services/passport/passport')(passport);
	app
		.use(passport.initialize())
		.use(passport.session())

		// routes
		.use(`/${apiPATH}/${apiVersion}`, routes)

		.use(notFound)
		.use(errorHandler)
		.listen(port, () => {
			// eslint-disable-next-line no-console
			console.log(
				`App listening on port ${chalk.yellow(`http://localhost:${port}`)} !`,
			);
			// eslint-disable-next-line no-console
			console.log(
				`Api route is ${chalk.blue(
					`http://localhost:${port}/${apiPATH}/${apiVersion}`,
				)}`,
			);
		});
};

module.exports = startServer;
