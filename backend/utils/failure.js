// returns a response object with status code and message for a failure http code
function failure(res, statusCode, message) {
    return res.status(statusCode).json({
        message: message,
    });
};

module.exports = failure;