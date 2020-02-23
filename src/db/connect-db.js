const mongoose = require('mongoose');
const chalk = require('chalk');

const connectToDB = dbUrl => {
	mongoose
		.connect(dbUrl, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		})
		.then(() => console.log(`Database connection ${chalk.green(`successful`)}`))
		.catch(err =>
			console.error(`Database connection ${chalk.red(`error`)}: `, err),
		);

	// const db = mongoose.connection;
	// db.on('error', console.error.bind(console, 'connection error:'));
	// db.once('open', () => {
	// 	console.log('Database connection successful');
	// });
};

module.exports = connectToDB;
