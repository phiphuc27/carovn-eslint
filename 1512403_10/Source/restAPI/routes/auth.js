const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Authorization' });
});

router.get(
	'/facebook',
	passport.authenticate('facebook', {
		authType: 'reauthenticate',
		scope: ['email']
	})
);
router.get(
	'/facebook/callback',
	passport.authenticate('facebook', {
		failureRedirect: '/'
	}),
	(req, res) => {
		res.send(req.user);
	}
);

router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['profile', 'email'],
		prompt: 'select_account'
	})
);
router.get(
	'/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/'
	}),
	(req, res) => {
		res.send(req.user);
	}
);

module.exports = router;
