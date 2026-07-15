function isAuthenticated(req, res, next) {
    // checks if current user is authenticated using passport and returns next if successful
    if (req.isAuthenticated()) {
        return next();
    };

    // returns a 401 failure response if not authenticated
    return res.status(401).json({
        message: 'Not Authenticated',
    });
};

module.exports = isAuthenticated;