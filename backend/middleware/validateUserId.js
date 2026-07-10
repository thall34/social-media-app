// validates user id from request parameters and ensures that it returns a numerical id for other functions
function validateUserId(req, res, next) {
    const userId = Number(req.params.userId);

    if (Number.isNaN(userId)) {
        return res.status(400).json({
            message: 'Invalid ID',
        });
    };

    req.validatedUserId = userId;
    next();
};

module.exports = validateUserId;