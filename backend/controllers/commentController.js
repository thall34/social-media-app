const db = require('../models/commentModels');
const { validationResult, matchedData } = require('express-validator');

async function getCommentById(req, res, next) {
    const id = req.validatedId;

    try {
        const comment = await db.getCommentById(id);
        if (!comment) {
            return res.status(404).json({
                message: 'Failed finding comment',
            })
        };

        return res.status(200).json({
            message: 'Successfully found comment',
            comment: comment,
        });
    } catch(err) {
        next(err);
    };
};

async function createComment(req, res, next) {
    const errors = validationResult(req);
    const userId = req.validatedUserId;
    const postId = req.validatedPostId;

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Invalid credentials to create new comment',
        });
    };

    try {
        const { text } = matchedData(req);
        const newComment = await db.createNewComment(text, userId, postId);
        if (!newComment) {
            return res.status(400).json({
                message: 'Failed creating new comment',
            });
        };

        return res.status(200).json({
            message: 'Successfully created new comment',
            newComment: newComment,
        });
    } catch(err) {
        next(err);
    };
};

async function updateComment(req, res, next) {
    const errors = validationResult(req);
    const id = req.validatedId;
    const userId = req.validatedUserId;

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Invalid credentials to update comment',
        });
    };

    try {
        const comment = await db.getCommentById(id);
        if (!comment) {
            return res.status(404).json({
                message: 'Failed finding comment',
            });
        };

        if (comment.authorId !== userId) {
            return res.status(403).json({
                message: 'Access forbidden',
            });
        };
        
        const { text } = matchedData(req);
        const updatedComment = await db.updateCommentById(text, id);
        if (!updatedComment) {
            return res.status(400).json({
                message: 'Failed updating comment',
            });
        };

        return res.status(200).json({
            message: 'Successfully updated comment',
            updatedComment: updatedComment,
        });
    } catch(err) {
        next(err);
    };
};

async function deleteComment(req, res, next) {
    const id = req.validatedId;
    const userId = req.validatedUserId;

    try {
        const comment = await db.getCommentById(id);
        if (!comment) {
            return res.status(404).json({
                message: 'Failed finding comment',
            });
        };

        if (comment.authorId !== userId) {
            return res.status(403).json({
                message: 'Access forbidden',
            });
        };

        await db.deleteCommentById(id);
        return res.sendStatus(204);
    } catch(err) {
        next(err);
    };
};

module.exports = {
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
}