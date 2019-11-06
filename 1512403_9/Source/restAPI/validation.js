/* Validation */
const Joi = require('@hapi/joi');

/* Register Validation */
const registerValidation = data => {
	const schema = Joi.object({
		email: Joi.string()
			.email()
			.required(),
		password: Joi.string().required(),
		repeat_password: Joi.ref('password')
	}).with('password', 'repeat_password');
	return schema.validate(data);
};

/* Login Validation */
const loginValidation = data => {
	const schema = Joi.object({
		email: Joi.string()
			.required()
			.email(),
		password: Joi.string().required()
	});
	return schema.validate(data);
};

/* Password Validation */
const passwordValidation = data => {
	const schema = Joi.object({
		old_password: Joi.string()
			.allow('')
			.optional(),
		new_password: Joi.string().required(),
		confirm_password: Joi.ref('new_password')
	}).with('new_password', 'confirm_password');
	return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.passwordValidation = passwordValidation;
