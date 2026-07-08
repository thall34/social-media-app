function errorHandler(err, req, res, next) {
    console.error(err);

    // postSQL Database errors
    if(err.code) {
        return res.status(500).json({
            message: 'Error - 500: Database error occured',
        });
    };

    // fallback to catch all errors
    return res.status(500).json({
            message: 'Error - 500: Server error occured',
    });
};

module.exports = errorHandler;