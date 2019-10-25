const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get(
	'/me',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		res.send(req.user);
	}
);

module.exports = router;
