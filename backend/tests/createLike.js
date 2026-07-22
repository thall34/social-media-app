const prisma = require('../config/db');

const createLike = async (postId, userId) => {
    return prisma.like.create({
        data: {
            postId: postId,
            userId: userId,
        },
    });
};

module.exports = createLike;