// returns a response object with status code and message for a success http code
function success(res, statusCode, message, data) {
    // if status code is 204(delete) just send the status code
    if (statusCode === 204) {
        return res.sendStatus(statusCode);
    };

    // if response doesn't require data it will just return the message
    if (!data) {
        return res.status(statusCode).json({
            message: message,
        });
    };

    // otherwise it will return message and data
    return res.status(statusCode).json({
        message: message,
        data: data,
    });
};

module.exports = success;