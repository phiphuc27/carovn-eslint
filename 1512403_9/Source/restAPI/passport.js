const passport = require('passport');
const passportJWT = require('passport-jwt');

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const FacebookStrategy = require('passport-facebook').Strategy;

const bcrypt = require('bcryptjs');
const db = require('./db');

require('dotenv').config();

// passport.serializeUser((user, done) => {
// 	done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
// 	db.findProfileById(id)
// 		.then(user => {
// 			done(null, user);
// 		})
// 		.catch(err => {
// 			done(err);
// 		});
// });

//Local Strategy
passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		async (email, password, cb) => {
			try {
				return db
					.findByEmail(email)
					.then(async user => {
						if (!user) {
							return cb(null, false, {
								message: 'Incorrect email or password.'
							});
						}
						// checking password
						const validPassword = await bcrypt.compare(password, user.password);
						if (!validPassword)
							return cb(null, false, {
								message: 'Incorrect email or password.'
							});

						return cb(null, user, { message: 'Logged In Successfully' });
					})
					.catch(err => {
						cb(err);
					});
			} catch (err) {
				cb(err);
			}
		}
	)
);

//JWT Strategy
const jwtOptions = {
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.TOKEN_SECRET
};

passport.use(
	new JWTStrategy(jwtOptions, async (jwtPayload, cb) => {
		//find the user in db if needed
		return await db
			.findProfileById(jwtPayload._id)
			.then(user => {
				return cb(null, user);
			})
			.catch(err => {
				return cb(err);
			});
	})
);
