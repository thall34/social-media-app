const { body } = require('express-validator');

const validateLogin = [
    body('username')
    .trim()
    .notEmpty().withMessage('Must include a username'),
    body('password')
    .trim()
    .notEmpty().withMessage('Must include a password'),
];

module.exports = validateLogin;