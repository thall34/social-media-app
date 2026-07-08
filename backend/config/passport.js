const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const userModel = require('../models/userModels');

// defining the local strategy for passport
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await userModel.getUserByUsername(username)

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

passport .serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.getUserById(id);

        done(null, user);
    } catch(err) {
        done(err);
    };
});