// validates id from request parameters and ensures that it returns a numerical id for other functions
function validateId(req, res, next) {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            message: 'Invalid ID',
        });
    };

    req.validatedId = id;
    next();
};

module.exports = validateId;