const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');

const bcrypt = require('bcryptjs');
const utils = require('../utils');
const passport = require('passport');

const {
	registerValidation,
	loginValidation,
	passwordValidation
} = require('../validation');

const db = require('../db');

router.get('/', (req, res, next) => {
	res.render('index', { title: 'User Page' });
});

/* GET users listing. */
router.get(
	'/profile',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		res.type('json').send(JSON.stringify(req.user, null, '\t'));
	}
);

router.post(
	'/profile',
	passport.authenticate('jwt', { session: false }),
	(req, res, next) => {
		db.updateProfile(req.body, req.user.id)
			.then(result => {
				res.status(200).send(result);
			})
			.catch(err => {
				res.status(500).send(err);
			});
	}
);

router.post(
	'/profile/changePassword',
	passport.authenticate('jwt', { session: false }),
	async (req, res, next) => {
		const { error } = passwordValidation(req.body);
		if (error) return res.status(400).send(error.details[0].message);
		if (!bcrypt.compare(req.body.old_password, req.user.password))
			return res.status(400).send('Your password is incorrect!');
		if (req.body.old_password === req.body.new_password)
			return res
				.status(400)
				.send('Your new password is same as your old password!');
		// hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.new_password, salt);
		const newPassword = {
			password: hashedPassword
		};
		db.updatePassword(newPassword, req.user.id)
			.then(result => {
				res.status(200).send(result);
			})
			.catch(err => {
				res.status(500).send(err);
			});
	}
);

router.post(
	'/profile/changePhoto',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		const newPhoto = {
			avatarURL: req.body.downloadUrl
		};
		db.updateProfile(newPhoto, req.user.id)
			.then(result => {
				res.status(200).send(result);
			})
			.catch(err => {
				res.status(500).send(err);
			});
	}
);

/* POST register user */
router.post('/register', async (req, res) => {
	// validation
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// checking if user email is already in database
	const emailExist = await db.checkEmailExist(req.body.email);
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
		db.insertProfile({
			id: savedUser.insertId,
			avatarURL: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
		});
		res.send({ userId: savedUser.insertId });
	} catch (err) {
		res.status(400).send(err);
	}
});

router.get('/login', (req, res) => {
	res.sendStatus(200);
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
			const token = utils.generateToken(user);
			user = utils.getCleanUser(user);
			return res.json({ user: user, token: token });
		});
	})(req, res);
});

router.post('/google', async (req, res) => {
	// checking if user email is already in database
	let userProfile = {
		google_id: req.body.googleId
	};
	const emailExist = await db.checkEmailExist(req.body.email);
	if (emailExist) {
		await db
			.findByEmail(req.body.email)
			.then(async user => {
				if (user.first_name === null)
					userProfile = { ...userProfile, first_name: req.body.givenName };
				if (user.last_name === null)
					userProfile = { ...userProfile, last_name: req.body.familyName };
				if (
					user.avatarURL ===
					'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
				)
					userProfile = { ...userProfile, avatarURL: req.body.photoURL };
				await db.updateProfile(userProfile, user.id);
				const token = utils.generateToken(user.id);
				return res.json({ token: token });
			})
			.catch(err => {
				console.log(err);
				return res.status(400).send(err);
			});
	} else {
		// create new user
		const user = {
			email: req.body.email
		};
		try {
			const savedUser = await db.insert(user);

			userProfile = {
				id: savedUser.insertId,
				first_name: req.body.givenName,
				last_name: req.body.familyName,
				avatarURL: req.body.photoURL
			};

			db.insertProfile(userProfile);
			const token = utils.generateToken(savedUser.insertId);
			return res.json({ token: token });
		} catch (err) {
			res.status(400).send(err);
		}
	}
});

router.post('/facebook', async (req, res) => {
	// checking if user email is already in database
	let userProfile = {
		facebook_id: req.body.facebookId
	};
	const emailExist = await db.checkEmailExist(req.body.email);
	if (emailExist) {
		await db
			.findByEmail(req.body.email)
			.then(async user => {
				if (user.first_name === null)
					userProfile = { ...userProfile, first_name: req.body.name };
				if (
					user.avatarURL ===
					'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
				)
					userProfile = { ...userProfile, avatarURL: req.body.photoURL };
				await db.updateProfile(userProfile, user.id);
				const token = utils.generateToken(user.id);
				return res.json({ token: token });
			})
			.catch(err => {
				return res.status(400).send(err);
			});
	} else {
		// create new user
		const user = {
			email: req.body.email
		};
		try {
			const savedUser = await db.insert(user);

			userProfile = {
				id: savedUser.insertId,
				first_name: req.body.name,
				avatarURL: req.body.photoURL
			};

			db.insertProfile(userProfile);
			const token = utils.generateToken(savedUser.insertId);
			return res.json({ token: token });
		} catch (err) {
			res.status(400).send(err);
		}
	}
});

module.exports = router;
