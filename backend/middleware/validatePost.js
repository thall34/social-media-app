// Express validation for post forms
const { body } = require('express-validator');

const validatePost = [
    body('text')
    .trim()
    .notEmpty().withMessage('Must include text content for post'),
];

module.exports = validatePost;