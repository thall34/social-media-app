const db = require('../models/postModels');
const { validationResult, matchedData } = require('express-validator');

async function getPost(req, res, next) {
    const id = req.validatedId;

    try {
        const post = await db.getPostById(id);
        if (!post) {
            return res.status(404).json({
                message: 'Failed finding post',
            })
        };

        return res.status(200).json({
            message: 'Successfully found post',
            post: post,
        });
    } catch(err) {
        next(err);
    };
};

async function createPost(req, res, next) {
    const errors = validationResult(req);
    const userId = req.validatedUserId;

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Invalid credentials to create new post',
        });
    };

    try {
        const { text } = matchedData(req);
        const newPost = await db.createNewPost(text, userId);
        if (!newPost) {
            return res.status(400).json({
                message: 'Failed creating new post',
            });
        };

        return res.status(200).json({
            message: 'Successfully created new post',
            newPost: newPost,
        });
    } catch(err) {
        next(err);
    };
};

async function updatePost(req, res, next) {
    const errors = validationResult(req);
    const id = req.validatedId;
    const userId = req.validatedUserId;

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Invalid credentials to update post',
        });
    };

    try {
        const post = await db.getPostById(id);
        if (!post) {
            return res.status(404).json({
                message: 'Failed finding post',
            });
        };

        if (post.authorId !== userId) {
            return res.status(403).json({
                message: 'Access forbidden',
            });
        };
        
        const { text } = matchedData(req);
        const updatedPost = await db.updatePostById(text, id);
        if (!updatedPost) {
            return res.status(400).json({
                message: 'Failed updating post',
            });
        };

        return res.status(200).json({
            message: 'Successfully updated post',
            updatedPost: updatedPost,
        });
    } catch(err) {
        next(err);
    };
};

async function deletePost(req, res, next) {
    const id = req.validatedId;
    const userId = req.validatedUserId;

    try {
        const post = await db.getPostById(id);
        if (!post) {
            return res.status(404).json({
                message: 'Failed finding post',
            });
        };

        if (post.authorId !== userId) {
            return res.status(403).json({
                message: 'Access forbidden',
            });
        };

        await db.deletePostById(id);
        return res.sendStatus(204);
    } catch(err) {
        next(err);
    };
};

async function getLikesForPost(req, res, next) {
    const id = req.validatedId;
    
    try {
        const likes = await db.getLikesForPostById(id);
        return res.status(200).json({
            message: 'Successfully retrieved likes',
            likes: likes,
        });
    } catch(err) {
        next(err);
    };
};

async function addLikeToPost(req, res, next) {
    const id = req.validatedId;
    const userId = req.validatedUserId;

    try {
        const newLike = await db.addLikeToPostById(id, userId);
        if (!newLike) {
            return res.status(400).json({
                message: 'Failed adding like to post',
            });
        };

        return res.status(200).json({
            message: 'Successfully added like to post',
            newLike: newLike,
        });
    } catch(err) {
        next(err);
    };
};

async function removeLikeFromPost(req, res, next) {
    const id = req.validatedId;
    const userId = req.validatedUserId;

    try {
        const removedLike = await db.removeLikeFromPostById(id, userId);
        console.log(removedLike);
        return res.sendStatus(204);
    } catch(err) {
        next(err);
    };
};

module.exports = {
    getPost,
    createPost,
    updatePost,
    deletePost,
    getLikesForPost,
    addLikeToPost,
    removeLikeFromPost,
}