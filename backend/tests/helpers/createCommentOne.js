const prisma = require('../../config/db');

const createCommentOne = async (userId, postId) => {
    return prisma.comment.create({
        data: {
            text: 'test1',
            authorId: userId,
            postId: postId,
        },
    });
};

module.exports = createCommentOne;