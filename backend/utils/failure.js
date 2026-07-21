// returns a response object with status code and message for a failure http code
function failure(statusCode, message) {
    const error = new Error(message);
    error.status = statusCode;
    return error;
};

module.exports = failure;