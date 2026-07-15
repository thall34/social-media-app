const prisma = require('../config/db');

// fetches a single comment from database by ID
async function getCommentById(id) {
    const comment = await prisma.comment.findUnique({
        where: { id: id },
    });

    return comment;
};

// creates a new comment entry in database
async function createNewComment(text, authorId, postId) {
    const newComment = await prisma.comment.create({
        data: {
            text: text,
            authorId: authorId,
            postId: postId
        },
    });

    return newComment;
};

// updates an existing comment entry in database by ID
async function updateCommentById(text, id) {
    const updatedComment = await prisma.comment.update({
        where: { id: id },
        data: {
            text: text,
        },
    });

    return updatedComment;
};

// deletes an existing comment entry in database by ID
async function deleteCommentById(id) {
    const deletedComment = await prisma.comment.delete({
        where: { id: id },
    });

    return deletedComment;
};

module.exports = {
    getCommentById, 
    createNewComment, 
    updateCommentById,
    deleteCommentById,
}