// validates post id from request parameters and ensures that it returns a numerical id for other functions
function validatePostId(req, res, next) {
    const postId = Number(req.params.postId);

    if (Number.isNaN(postId)) {
        return res.status(400).json({
            message: 'Invalid ID',
        });
    };

    req.validatedPostId = postId;
    next();
};

module.exports = validatePostId;