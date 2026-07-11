const prisma = require('../config/db');

async function getCommentById(id) {
    const comment = await prisma.comment.findUnique({
        where: { id: id },
    });

    return comment;
};

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

async function updateCommentById(text, id) {
    const updatedComment = await prisma.comment.update({
        where: { id: id },
        data: {
            text: text,
        },
    });

    return updatedComment;
};

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