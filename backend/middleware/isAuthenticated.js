const passport = require('passport')

function isAuthenticated(req, res, next) {
    // checks if current user is authenticated using passport and returns next if successful

    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        };

        if (!user) {
            // returns a 401 failure response if not authenticated
            return res.status(401).json({
                message: 'Not Authenticated',
            });
        };

        req.user = user;
        next();
    })(req, res, next);
};

module.exports = isAuthenticated;