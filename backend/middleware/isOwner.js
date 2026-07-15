function isOwner(req, res, next) {
    // checks if passport user ID is the same as the user ID being passed through params
    if(req.user.id === req.validatedId) {
        return next();
    };

    // returns a 403 failure response if not
    return res.status(403).json({
        message: 'Access Forbidden',
    });
};

module.exports = isOwner;