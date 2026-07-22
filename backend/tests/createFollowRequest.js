const prisma = require('../config/db');

const createFollowRequest = async (user1Id, user2Id) => {
    return prisma.followRequest.create({
        data: {
            followingUserId: user1Id,
            followedUserId: user2Id,
        },
    });
};

module.exports = createFollowRequest;