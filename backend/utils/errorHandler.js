const multer = require('multer');

function errorHandler(err, req, res, next) {
    console.error(err);

    // Multer errors
    if (err instanceof multer.MulterError) {
        switch (err.code) {
            case 'LIMIT_FILE_SIZE':
                return res.status(400).json({
                    message: 'The uploaded file exceeds the maximum allowed (5mb)',
                });

            default:
                return res.status(400).json({
                    message: 'Upload Error',
                });
        };
    };

    // Multer upload wrong file type error
    if (err.message === 'Invalid file type') {
        return res.status(400).json({
            message: 'Only JPG, PNG, and WEBP images are allowed.',
        });
    };

    // postSQL Database errors
    if (err.code) {
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