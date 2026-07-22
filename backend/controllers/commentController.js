const db = require('../models/commentModels');
const { validationResult, matchedData } = require('express-validator');
const success = require('../utils/success');
const failure = require('../utils/failure');

// obtains a single comment from the database by comment ID
async function getComment(req, res, next) {
    const id = req.validatedId;

    try {
        const comment = await db.getCommentById(id);
        // if no comment is found, return a 404 failure response
        if (!comment) {
            return next(failure(404, 'Comment not found'));
        };

        // return a 200 success response with the found comment
        return success(res, 200, 'Comment found', comment);
    } catch(err) {
        next(err);
    };
};

// creates a new comment database entry
async function createComment(req, res, next) {
    const errors = validationResult(req);
    const userId = req.user.id;
    const postId = req.validatedPostId;

    // if there are any form validation errors, return a 400 failure response
    if (!errors.isEmpty()) {
        return next(failure(400, 'Form fields contain invalid data'));
    };

    try {
        const { text } = matchedData(req);
        const newComment = await db.createNewComment(text, userId, postId);
        // return a 201 success response with the new comment
        return success(res, 201, 'Comment created', newComment);
    } catch(err) {
        next(err);
    };
};

// updates an existing comment database entry by comment ID
async function updateComment(req, res, next) {
    const errors = validationResult(req);
    const id = req.validatedId;
    const userId = req.user.id;

    // if there are any form validation errors, return a 400 failure response
    if (!errors.isEmpty()) {
        return next(failure(400, 'Form fields contain invalid data'));
    };

    try {
        // looks through database to ensure the comment exists before updating
        const comment = await db.getCommentById(id);
        // if no comment is found, return a 404 failure response
        if (!comment) {
            return next(failure(404, 'Comment not found'));
        };

        // if comment author does not match the current user, return a 403 failure response
        if (comment.authorId !== userId) {
            return next(failure(403, 'Access forbidden'));
        };
        
        const { text } = matchedData(req);
        const updatedComment = await db.updateCommentById(text, id);
        // return a 200 success response with the updated comment
        return success(res, 200, 'Updated comment', updatedComment);
    } catch(err) {
        next(err);
    };
};

// deletes an existing comment database entry by comment ID
async function deleteComment(req, res, next) {
    const id = req.validatedId;
    const userId = req.user.id;

    try {
        // looks through database to ensure the comment exists before deleting
        const comment = await db.getCommentById(id);
        // if no comment is found, return a 404 failure response
        if (!comment) {
            return next(failure(404, 'Comment not found'));
        };

        // if comment author does not match the current user, return a 403 failure response
        if (comment.authorId !== userId) {
            return next(failure(403, 'Access forbidden'));
        };

        await db.deleteCommentById(id);
        // return a 204 success response indicating the comment was deleted
        return success(res, 204);
    } catch(err) {
        next(err);
    };
};

module.exports = {
    getComment,
    createComment,
    updateComment,
    deleteComment,
}