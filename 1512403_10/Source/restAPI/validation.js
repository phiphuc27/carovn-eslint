/* Validation */
const Joi = require('@hapi/joi');

/* Register Validation */
const registerValidation = data => {
	const schema = Joi.object({
		name: Joi.string()
			.alphanum()
			.min(3)
			.max(30)
			.required(),
		email: Joi.string()
			.email()
			.required(),
		password: Joi.string().required(),
		repeat_password: Joi.ref('password')
	}).with('password', 'repeat_password');
	return schema.validate(data);
};

/* RLogin Validation */
const loginValidation = data => {
	const schema = Joi.object({
		email: Joi.string()
			.required()
			.email(),
		password: Joi.string().required()
	});
	return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
