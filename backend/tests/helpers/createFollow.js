const prisma = require('../../config/db');

const createFollow = async (user1Id, user2Id) => {
    return prisma.follow.create({
        data: {
            followingUserId: user1Id,
            followedUserId: user2Id,
        },
    });
};

module.exports = createFollow;