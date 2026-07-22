const prisma = require('../config/db');

// NOTE FOR ALL USERNAME QUERIES - EMAIL IS BEING USED AS USERNAME

// fetches minimal user details needed to serialize the passport session
async function getUserByUsernameForPassport(username) {
    const user = await prisma.user.findUnique({
        where: { email: username },
        select: {
            id: true,
            email: true,
            passwordHash: true,
        },
    });

    return user;
};

// fetches a single user from database by ID
// includes all posts by user including comments for each post
// includes all data from following and followers join tables
// includes all user IDs in following request and followed request join tables
async function getUserById(id) {
    const user = await prisma.user.findUnique({
        where: { id: id },
        include: {
            posts: {
                include: {
                    comments: true,
                },
            },
            following: true,
            followers: true,
            following_request: {
                select: {
                    followedUserId: true,
                },
            },
            followed_request: {
                select: {
                    followingUserId: true,
                },
            },
        },
        omit: {
            passwordHash: true,
        },
    });

    return user;
};

// creates a new user entry in database
async function createNewUser(firstName, lastName, username, password, filePath, cloudId, city, birthDate) {
    const newUser = await prisma.user.create({
        data: {
            firstName: firstName,
            lastName: lastName,
            email: username,
            passwordHash: password,
            profilePicFilePath: filePath,
            profilePicCloudId: cloudId,
            city: city,
            birthDate: birthDate,
        },
        omit: {
            passwordHash: true,
        },
    });

    return newUser;
};

// updates an existing user entry in database by ID
async function updateUserById(firstName, lastName, username, password, city, birthDate, id) {
    const updatedUser = await prisma.user.update({
        where: { id: id },
        data: {
            firstName: firstName,
            lastName: lastName,
            email: username,
            passwordHash: password,
            city: city,
            birthDate: birthDate,
        },
        omit: {
            passwordHash: true,
        },
    });

    return updatedUser;
};

// updates an existing user's profile pic entries in database by ID
async function updateUserProfilePicById(id, filePath, cloudId) {
    const updatedUser = await prisma.user.update({
        where: { id: id },
        data: {
            profilePicFilePath: filePath,
            profilePicCloudId: cloudId,
        },
        omit: {
            passwordHash: true,
        },
    });

    return updatedUser;
};

// deletes an existing user entry in database by ID
async function deleteUserById(id) {
    const deletedUser = await prisma.user.delete({
        where: { id: id },
        omit: {
            passwordHash: true,
        },
    });

    return deletedUser;
};

// fetches all users except for the current user
// includes posts and comments for each user
async function getPeerPool(id) {
    const users = await prisma.user.findMany({
        where: {
            NOT: {
                id: id,
            },
        },
        include: {
            posts: {
                include: {
                    comments: true,
                },
            },
        },
        omit: {
            passwordHash: true,
        },
    });

    return users;
};

// fetches all peers that the current peer is following
// includes their id, first name, last name and profile pic file path for each peer
async function getPeerPoolForPeer(peerId) {
    const users = await prisma.follow.findMany({
        where: {
            followingUserId: peerId,
        },
        select: {
            followed: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    profilePicFilePath: true,
                },
            },
        },
    });

    return users; 
};

// fetches a single follow request from database by followed ID and following ID
async function getFollowRequestByIds(followingUserId, followedUserId) {
    const followRequest = await prisma.followRequest.findUnique({
        where: {
            followedUserId_followingUserId: {
                followedUserId: followedUserId,
                followingUserId: followingUserId,
            },
        },
    });

    return followRequest;
};

// creates a new follow request database entry
async function addFollowRequestToUser(followingUserId, followedUserId) {
    const followRequest = await prisma.followRequest.create({
        data: {
            followedUserId: followedUserId,
            followingUserId: followingUserId,
        },
    });

    return followRequest;
};

// deletes an existing follow request database entry by followed ID and following ID
async function removeFollowRequestFromUser(followingUserId, followedUserId) {
    const removeFollowRequest = await prisma.followRequest.delete({
        where: {
            followedUserId_followingUserId: {
                followedUserId: followedUserId,
                followingUserId: followingUserId,
            },
        },
    });

    return removeFollowRequest;
};

// fetches a single follow from database by followed ID and following ID
async function getFollowerByIds(followedUserId, followingUserId) {
    const follower = await prisma.follow.findUnique({
        where: {
            followedUserId_followingUserId: {
                followedUserId: followedUserId,
                followingUserId: followingUserId,
            },
        },
    });

    return follower;
};

// creates a new follow database entry
async function addFollowerToUser(followedUserId, followingUserId) {
    const addFollower = await prisma.follow.create({
        data: {
            followedUserId: followedUserId,
            followingUserId: followingUserId,
        },
    });

    return addFollower;
};

// deletes an existing follow database entry by followed ID and following ID
async function removeFollower(followedUserId, followingUserId) {
    const deleteFollower = await prisma.follow.delete({
        where: {
            followedUserId_followingUserId: {
                followedUserId: followedUserId,
                followingUserId: followingUserId,
            },
        },
    });

    return deleteFollower;
};

module.exports = {
    getUserByUsernameForPassport,
    getUserById,
    createNewUser,
    updateUserById,
    updateUserProfilePicById,
    deleteUserById,
    getPeerPool,
    getPeerPoolForPeer,
    getFollowRequestByIds,
    addFollowRequestToUser,
    removeFollowRequestFromUser,
    getFollowerByIds,
    addFollowerToUser,
    removeFollower,
}; 