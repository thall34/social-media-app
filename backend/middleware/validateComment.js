// Express validation for comment forms
const { body } = require('express-validator');

const validateComment = [
    body('text')
    .trim()
    .notEmpty().withMessage('Must include text content for comment'),
];

module.exports = validateComment;