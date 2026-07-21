const db = require('../models/postModels');
const { validationResult, matchedData } = require('express-validator');
const success = require('../utils/success');
const failure = require('../utils/failure');

// obtains a single post from the database by post ID
async function getPost(req, res, next) {
    const id = req.validatedId;

    try {
        const post = await db.getPostById(id);
        // if no post is found, return a 404 failure response
        if (!post) {
            return next(failure(404, 'Failed finding post'));
        };

        // return a 200 success response with the found post
        return success(res, 200, 'Successfully found post', post);
    } catch(err) {
        next(err);
    };
};

// obtains all posts created by the current user and every peer that user is following by user ID
async function getAllPostsForUser(req, res, next) {
    const userId = req.user.id;

    try {
        const posts = await db.getAllPostsForUserById(userId);
        // returns a 200 success response with the found posts
        return success(res, 200, 'Successfully found posts', posts);
    } catch(err) {
        next(err);
    };
};

// creates a new post database entry
async function createPost(req, res, next) {
    const errors = validationResult(req);
    const userId = req.user.id;

    // if there are any form validation errors, return a 400 failure response
    if (!errors.isEmpty()) {
        return next(failure(400, 'Form fields contain invalid data'));
    };

    try {
        const { text } = matchedData(req);
        const newPost = await db.createNewPost(text, userId);
        // return a 201 success response with the new post
        return success(res, 201, 'Successfully created new post', newPost);
    } catch(err) {
        next(err);
    };
};

// updates an existing post database entry by post ID
async function updatePost(req, res, next) {
    const errors = validationResult(req);
    const id = req.validatedId;
    const userId = req.user.id;

    // if there are any form validation errors, return a 400 failure response
    if (!errors.isEmpty()) {
        return next(failure(400, 'Form fields contain invalid data'));
    };

    try {
        // looks through database to ensure the post exists before updating
        const post = await db.getPostById(id);
        // if no post is found, return a 404 failure response
        if (!post) {
            return next(failure(404, 'Failed finding post'));
        };

        // if post author does not match the current user, return a 403 failure response
        if (post.authorId !== userId) {
            return next(failure(403, 'Access forbidden'));
        };
        
        const { text } = matchedData(req);
        const updatedPost = await db.updatePostById(text, id);
        // return a 200 success response with the updated comment
        return success(res, 200, 'Successfully updated post', updatedPost);
    } catch(err) {
        next(err);
    };
};

// deletes an existing post database entry by post ID
async function deletePost(req, res, next) {
    const id = req.validatedId;
    const userId = req.user.id;

    try {
        // looks through database to ensure the post exists before deleting
        const post = await db.getPostById(id);
        // if no post is found, return a 404 failure response
        if (!post) {
            return next(failure(404, 'Failed finding post'));
        };

        // if post author does not match the current user, return a 403 failure response
        if (post.authorId !== userId) {
            return next(failure(403, 'Access forbidden'));
        };

        await db.deletePostById(id);
        // return a 204 success response indicating the post was deleted
        return success(res, 204);
    } catch(err) {
        next(err);
    };
};

// obtains all posts created by a peer by peer ID
async function getPostsForPeer(req, res, next) {
    const id = req.validatedId;
    try {
        const posts = await db.getPostsForPeerById(id);
        // returns a 200 success response with the found posts
        return success(res, 200, 'Successfully found posts', posts);
    } catch(err) {
        next(err);
    };
};

// creates a new like database entry
async function addLikeToPost(req, res, next) {
    const postId = req.validatedId;
    const userId = req.user.id;

    try {
        const newLike = await db.addLikeToPostById(userId, postId);
        // return a 201 success response with the new like
        return success(res, 201, 'Successfully added like to post', newLike);
    } catch(err) {
        next(err);
    };
};

// deletes an existing like database entry by user ID and post ID
async function removeLikeFromPost(req, res, next) {
    const postId = req.validatedId;
    const userId = req.user.id;

    try {
        // looks through database to ensure the like exists before deleting
        const like = await db.getLikeByIds(userId, postId);
        // if no like is found, return a 404 failure response
        if (!like) {
            return next(failure(404, 'Failed finding like'));
        };

        const removedLike = await db.removeLikeFromPostById(userId, postId);
        // return a 204 success response indicating the like was deleted
        return success(res, 204);
    } catch(err) {
        next(err);
    };
};

module.exports = {
    getPost,
    getAllPostsForUser,
    createPost,
    updatePost,
    deletePost,
    getPostsForPeer,
    addLikeToPost,
    removeLikeFromPost,
}