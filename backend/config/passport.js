const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');

const db = require('../models/userModels');

// defining the local strategy for passport
passport.use('local',
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await db.getUserByUsernameForPassport(username)

            if (!user) {
                return done(null, false, { message: 'Incorrect username' });
            };

            const match = await bcrypt.compare(password, user.passwordHash);

            if (!match) {
                return done(null, false, { message: 'Incorrect password' });
            };

            return done(null, user);
        } catch(err) {
            return done(err);
        };
    })
);

// defining the jwt strategy for passport
passport.use('jwt',
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
},
    async(jwtPayload, done) => {
        try {
            const user = await db.getUserById(jwtPayload.id);

            if (!user) {
                return done(null, false);
            };

            return done(null, user);
        } catch(err) {
            return done(err, false);
        };
    }),
);

// passport .serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await db.getUserById(id);

//         done(null, user);
//     } catch(err) {
//         done(err);
//     };
// });