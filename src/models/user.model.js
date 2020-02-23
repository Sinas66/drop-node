const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const cryptoRandomString = require('crypto-random-string');

const { Schema, model } = mongoose;
const { jwtSecretKey } = require('../config/config');

const UserSchema = new Schema(
	{
		email: {
			type: String,
			unique: true,
			lowercase: true,
			index: true,
			required: true,
		},
		username: {
			type: String,
			unique: true,
			sparse: true,
			// required: true,
			// lowercase: true,
			trim: true,
			minlength: 3,
			maxlength: 16,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		uid: {
			type: String,
			default: 'uid-' + cryptoRandomString({ length: 10, type: 'numeric' }),
		},
		token: { type: String },
		facebookId: {
			type: String,
		},
		googleId: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

UserSchema.methods.getPublicFields = function() {
	return {
		userData: {
			email: this.email,
			username: this.username,
			uid: this.uid,
		},
		token: this.token,
	};
};

// Saves the user's password hashed (plain text password storage is not good)
UserSchema.pre('save', function(next) {
	const user = this;

	if (this.isModified('password') || this.isNew)
		bcrypt.genSalt(10, (err, salt) => {
			if (err) return next(err);

			bcrypt.hash(user.password, salt, (err, hash) => {
				if (err) return next(err);

				user.password = hash;
				next();
			});
		});
	else return next();
});

UserSchema.pre('findOneAndUpdate', function(next) {
	const update = this.getUpdate();
	// Если обновляем пароль
	// привет callback hell
	if (update.$set && update.$set.password)
		bcrypt
			.hash(update.$set.password, 10)
			.then(hashedPassword => {
				update.$set.password = hashedPassword;
				next();
			})
			.catch(err => next(err));
	else next();
});

UserSchema.methods.comparePassword = async function(password) {
	bcrypt
		.compare(password, this.password)
		.then(
			result =>
				new Promise((resolve, reject) => (result ? resolve() : reject())),
		)
		.catch(err => console.log('comparePassword err', err));
};

UserSchema.methods.getJWT = function() {
	const preToken = jwt.sign(
		{
			id: this._id,
		},
		jwtSecretKey,
	);

	const token = `Bearer ${preToken}`;

	this.token = token;
	this.save();
	return token;
};

module.exports = model('User', UserSchema);
