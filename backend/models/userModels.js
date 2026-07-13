const prisma = require('../config/db');

// NOTE FOR ALL USERNAME QUERIES - EMAIL IS BEING USED AS USERNAME

async function getUserByUsername(username) {
    const user = await prisma.user.findUnique({
        where: { email: username },
    });

    return user;
};

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
    });

    return user;
};

async function createNewUser(firstName, lastName, username, password, city, birthDate) {
    const newUser = await prisma.user.create({
        data: {
            firstName: firstName,
            lastName: lastName,
            email: username,
            passwordHash: password,
            city: city,
            birthDate: birthDate,
        },
    });

    return newUser;
};

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
    });

    return updatedUser;
};

async function deleteUserById(id) {
    const deletedUser = await prisma.user.delete({
        where: { id: id },
    });

    return deletedUser;
};

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
    });

    return users;
};

async function addFollowRequestToUser(followingUserId, followedUserId) {
    const followRequest = await prisma.followRequest.create({
        data: {
            followedUserId: followedUserId,
            followingUserId: followingUserId,
        },
    });

    return followRequest;
};

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

async function addFollowerAndRemoveRequest(followedUserId, followingUserId) {
    const addFollower = await prisma.follow.create({
        data: {
            followedUserId: followedUserId,
            followingUserId: followingUserId,
        },
    });

    const deleteFollowRequest = await prisma.followRequest.delete({
        where: {
            followedUserId_followingUserId: {
                followedUserId: followedUserId,
                followingUserId: followingUserId,
            },
        },
    });

    return addFollower;
};

async function declineFollowRequestFromUser(followedUserId, followingUserId) {
    const deleteFollowRequest = await prisma.followRequest.delete({
        where: {
            followedUserId_followingUserId: {
                followedUserId: followedUserId,
                followingUserId: followingUserId,
            },
        },
    });

    return deleteFollowRequest;
};

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
    getUserByUsername,
    getUserById,
    createNewUser,
    updateUserById,
    deleteUserById,
    getPeerPool,
    addFollowRequestToUser,
    removeFollowRequestFromUser,
    addFollowerAndRemoveRequest,
    declineFollowRequestFromUser,
    removeFollower,
};