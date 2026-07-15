const db = require('../models/commentModels');
const { validationResult, matchedData } = require('express-validator');

// obtains a single comment from the database by comment ID
async function getComment(req, res, next) {
    const id = req.validatedId;

    try {
        const comment = await db.getCommentById(id);
        // if no comment is found, return a 404 failure response
        if (!comment) {
            return res.status(404).json({
                message: 'Failed finding comment',
            })
        };

        // return a 200 success response with the found comment
        return res.status(200).json({
            message: 'Successfully found comment',
            comment: comment,
        });
    } catch(err) {
        next(err);
    };
};

// creates a new comment database entry
async function createComment(req, res, next) {
    const errors = validationResult(req);
    const userId = req.validatedUserId;
    const postId = req.validatedPostId;

    // if there are any form validation errors, return a 400 failure response
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Invalid credentials to create new comment',
        });
    };

    try {
        const { text } = matchedData(req);
        const newComment = await db.createNewComment(text, userId, postId);
        // if the comment is not created, return a 400 failure response
        if (!newComment) {
            return res.status(400).json({
                message: 'Failed creating new comment',
            });
        };

        // return a 201 success response with the new comment
        return res.status(201).json({
            message: 'Successfully created new comment',
            newComment: newComment,
        });
    } catch(err) {
        next(err);
    };
};

// updates an existing comment database entry by comment ID
async function updateComment(req, res, next) {
    const errors = validationResult(req);
    const id = req.validatedId;
    const userId = req.validatedUserId;

    // if there are any form validation errors, return a 400 failure response
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Invalid credentials to update comment',
        });
    };

    try {
        // looks through database to ensure the comment exists before updating
        const comment = await db.getCommentById(id);
        // if no comment is found, return a 404 failure response
        if (!comment) {
            return res.status(404).json({
                message: 'Failed finding comment',
            });
        };

        // if comment author does not match the current user, return a 403 failure response
        if (comment.authorId !== userId) {
            return res.status(403).json({
                message: 'Access forbidden',
            });
        };
        
        const { text } = matchedData(req);
        const updatedComment = await db.updateCommentById(text, id);
        // if the comment is not updated, return a 400 failure response
        if (!updatedComment) {
            return res.status(400).json({
                message: 'Failed updating comment',
            });
        };

        // return a 200 success response with the updated comment
        return res.status(200).json({
            message: 'Successfully updated comment',
            updatedComment: updatedComment,
        });
    } catch(err) {
        next(err);
    };
};

// deletes an existing comment database entry by comment ID
async function deleteComment(req, res, next) {
    const id = req.validatedId;
    const userId = req.validatedUserId;

    try {
        // looks through database to ensure the comment exists before deleting
        const comment = await db.getCommentById(id);
        // if no comment is found, return a 404 failure response
        if (!comment) {
            return res.status(404).json({
                message: 'Failed finding comment',
            });
        };

        // if comment author does not match the current user, return a 403 failure response
        if (comment.authorId !== userId) {
            return res.status(403).json({
                message: 'Access forbidden',
            });
        };

        await db.deleteCommentById(id);
        // return a 204 success response indicating the comment was deleted
        return res.sendStatus(204);
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