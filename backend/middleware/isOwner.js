function isOwner(req, res, next) {
    if(req.user.id === req.validatedId) {
        return next();
    };

    return res.status(403).json({
        message: 'Access Forbidden',
    });
};

module.exports = isOwner;