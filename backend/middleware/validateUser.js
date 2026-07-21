// Express validation for new user form
const { body } = require('express-validator');

const validateUser = [
    body('firstName')
    .trim()
    .notEmpty().withMessage('Must include a first name'),
    body('lastName')
    .trim()
    .notEmpty().withMessage('Must include a last name'),
    body('username')
    .trim()
    .notEmpty().withMessage('Must include an email')
    .isEmail().withMessage('Must be a valid email (example@example.com)')
    .normalizeEmail(),
    body('password')
    .trim()
    .notEmpty().withMessage('Must include a password'),
    body('city')
    .trim(),
    body('birthDate')
    .trim()
    .notEmpty().withMessage('Must include a birthdate')
    .isDate({ format: 'YYYY-MM-DD' }).withMessage('Must be a valid date')
    .toDate(),
];

module.exports = validateUser;