const prisma = require('../config/db');

async function getPostById(id) {
    const post = await prisma.post.findUnique({
        where: { id: id },
    });

    return post;
};

async function createNewPost(text, authorId) {
    const newPost = await prisma.post.create({
        data: {
            text: text,
            authorId: authorId,
        },
    });

    return newPost;
};

async function updatePostById(text, id) {
    const updatedPost = await prisma.post.update({
        where: { id: id },
        data: {
            text: text,
        },
    });

    return updatedPost;
};

async function deletePostById(id) {
    const deletedPost = await prisma.post.delete({
        where: { id: id },
    });

    return deletedPost;
};

module.exports = {
    getPostById, 
    createNewPost, 
    updatePostById,
    deletePostById,
}