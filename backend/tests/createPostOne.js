const prisma = require('../config/db');

const createPostOne = async (userId) => {
    return prisma.post.create({
        data: {
            text: 'test1',
            authorId: userId,
        },
    });
};

module.exports = createPostOne;