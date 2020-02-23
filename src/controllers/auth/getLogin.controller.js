const getLogin = (req, res) => {
	const form = {
		fields: [
			{
				type: 'email',
				name: 'email',
				required: true,
				label: 'Электронная почта',
				helpText: 'Введите ваш адрес электронной почты',
			},

			{
				type: 'password',
				name: 'password',
				required: true,
				label: 'Пароль',
				helpText: 'Пароль от акаунта',
			},
		],
		values: {
			email: '',
			password: '',
		},
	};

	res.json({ status: 'success', form: form });
};

module.exports = getLogin;
