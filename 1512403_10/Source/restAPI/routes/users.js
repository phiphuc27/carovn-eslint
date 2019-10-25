const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const { registerValidation, loginValidation } = require('../validation');

const db = require('../db');

/* GET users listing. */
router.get('/', (req, res, next) => {
	console.log(req.profile);
	res.render('index', { title: req.user });
});

/* POST register user */
router.post('/register', async (req, res) => {
	// validation
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// checking if user email is already in database
	const emailExist = await db.checkEmailExist(req.body.email);
	console.log(emailExist);
	if (emailExist) return res.status(400).send('Email is already existed!');

	// hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	// create new user
	const user = {
		email: req.body.email,
		password: hashedPassword
	};
	try {
		const savedUser = await db.insert(user);
		db.insertProfile({ user_id: savedUser.insertId });
		res.send({ userId: savedUser.insertId });
	} catch (err) {
		res.status(400).send(err);
	}
});

/* POST login user */
router.post('/login', async (req, res) => {
	// validation
	const { error } = loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	passport.authenticate('local', { session: false }, (err, user, info) => {
		if (err || !user) {
			return res.status(400).send({
				message: 'Something is not right',
				user: user
			});
		}
		req.login(user, { session: false }, err => {
			if (err) {
				res.send(err);
			}
			// generate a signed son web token with the contents of user object and return it in the response
			const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
			return res.json({ token: 'Bearer ' + token });
		});
	})(req, res);
});

module.exports = router;
