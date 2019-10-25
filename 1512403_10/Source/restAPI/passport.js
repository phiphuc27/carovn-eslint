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

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	db.findById(id).then(user => {
		done(null, user);
	});
});

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
					.catch(err => cb(err));
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
			.findById(jwtPayload._id)
			.then(user => {
				return cb(null, user);
			})
			.catch(err => {
				return cb(err);
			});
	})
);

//Facebook Strategy
passport.use(
	new FacebookStrategy(
		{
			clientID: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
			callbackURL: '/auth/facebook/callback',
			profileFields: ['id', 'name', 'emails', 'gender', 'picture.type(large)']
		},
		async (accessToken, refreshToken, profile, done) => {
			return await db
				.findByEmail(profile.emails[0].value)
				.then(async existsUser => {
					if (existsUser) {
						const userProfile = {
							first_name: profile.name.givenName,
							last_name: profile.name.familyName,
							facebook_id: profile.id,
							avatarURL: profile.photos[0].value
						};
						db.updateProfile(userProfile, existsUser.id);
						return done(null, existsUser);
					} else {
						const newUser = {
							email: profile.emails[0].value
						};
						const savedUser = await db.insert(newUser);
						console.log(savedUser);
						const userProfile = {
							user_id: savedUser.insertId,
							first_name: profile.name.givenName,
							last_name: profile.name.familyName,
							facebook_id: profile.id,
							avatarURL: profile.photos[0].value
						};
						await db.insertProfile(userProfile);
						await db.findById(savedUser.insertId).then(user => {
							console.log(user);
							return done(null, user[0]);
						});
					}
				})
				.catch(err => {
					return done(err);
				});
		}
	)
);

//Google Strategy
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/google/callback'
		},
		async (accessToken, refreshToken, profile, done) => {
			return await db
				.findByEmail(profile.emails[0].value)
				.then(async existsUser => {
					if (existsUser) {
						const userProfile = {
							first_name: profile.name.givenName,
							last_name: profile.name.familyName,
							google_id: profile.id,
							avatarURL: profile.photos[0].value
						};
						db.updateProfile(userProfile, existsUser.id);
						return done(null, existsUser);
					} else {
						const newUser = {
							email: profile.emails[0].value
						};
						const savedUser = await db.insert(newUser);
						const userProfile = {
							user_id: savedUser.insertId,
							first_name: profile.name.givenName,
							last_name: profile.name.familyName,
							google_id: profile.id,
							avatarURL: profile.photos[0].value
						};
						db.insertProfile(userProfile);
						db.findById(savedUser.insertId).then(user => {
							console.log(user);
							return done(null, user[0]);
						});
					}
				})
				.catch(err => {
					return done(err);
				});
		}
	)
);
