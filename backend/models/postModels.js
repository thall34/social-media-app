const prisma = require('../config/db');

// fetches a single post from database by ID
// includes all user IDs in the likes join table 
// includes the post author's first name, last name and profile pic file path
// includes all comment author's first names, last names and profile pic file path
async function getPostById(id) {
    const post = await prisma.post.findUnique({
        where: { id: id },
        include: {
            likes: {
                select: {
                    userId: true,
                },
            },
            author: {
                select: {
                    firstName: true,
                    lastName: true,
                    profilePicFilePath: true,
                },
            },
            comments: {
                include: {
                    author: {
                        select: {
                            firstName: true,
                            lastName: true,
                            profilePicFilePath: true,
                        },
                    },
                },
            },
        },
    });

    return post;
};

// creates a new post entry in database
async function createNewPost(text, authorId) {
    const newPost = await prisma.post.create({
        data: {
            text: text,
            authorId: authorId,
        },
    });

    return newPost;
};

// updates an existing post entry in database by ID
async function updatePostById(text, id) {
    const updatedPost = await prisma.post.update({
        where: { id: id },
        data: {
            text: text,
        },
    });

    return updatedPost;
};

// deletes an existing post entry in database by ID
async function deletePostById(id) {
    const deletedPost = await prisma.post.delete({
        where: { id: id },
    });

    return deletedPost;
};

// fetches all posts for user by user ID
// includes all posts by peers that user is following
async function getAllPostsForUserById(id) {
    // fetches all peers the user is following
    const followers = await prisma.user.findUnique({
        where: { id: id },
        select: {
            following: {
                select: {
                    followedUserId: true,
                },
            },
        },
    });

    // maps user IDs of the peers the user is following to a new array
    const followerIds = followers.following.map(follower => follower.followedUserId);

    // fetches all posts using an array containing the user ID and following peer IDs
    // includes all user IDs in the likes join table for each post
    // includes the post author's first name, last name and profile pic file path for each post
    // includes all comment author's first names, last names and profile pic file path for each post
    // orders them from oldest to newest
    const posts = await prisma.post.findMany({
        where: {
            authorId: {
                in: [id, ...followerIds],
            },
        },
        include: {
            likes: {
                select: {
                    userId: true,
                },
            },
            author: {
                select: {
                    firstName: true,
                    lastName: true,
                    profilePicFilePath: true,
                },
            },
            comments: {
                include: {
                    author: {
                        select: {
                            firstName: true,
                            lastName: true,
                            profilePicFilePath: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return posts;
};

// fetches all posts for peer by peer ID
// includes all user IDs in the likes join table for each post
// includes the post author's first name, last name and profile pic file path for each post
// includes all comment author's first names, last names and profile pic file path for each post
// orders them from oldest to newest
async function getPostsForPeerById(id) {
    const posts = await prisma.post.findMany({
        where: { authorId: id },
        include: {
            likes: {
                select: {
                    userId: true,
                },
            },
            author: {
                select: {
                    firstName: true,
                    lastName: true,
                    profilePicFilePath: true,
                },
            },
            comments: {
                include: {
                    author: {
                        select: {
                            firstName: true,
                            lastName: true,
                            profilePicFilePath: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return posts;
};

// fetches a single like from the like join table by user ID and post ID
async function getLikeByIds(userId, postId) {
    const like = await prisma.like.findUnique({
        where: {
            userId: userId,
            postId: postId,
        },
    });

    return like;
};

// creates a new like entry in database
async function addLikeToPostById(userId, postId) {
    const addedLike = await prisma.like.create({
        data: {
            userId: userId,
            postId: postId,
        },
    });

    return addedLike;
};

// deletes an existing like entry by user ID and post ID
async function removeLikeFromPostById(userId, postId) {
    const removedLike = await prisma.like.delete({
        where: {
            userId_postId: {
                userId: userId,
                postId: postId,
            },
        },
    });

    return removedLike;
};

module.exports = {
    getPostById, 
    createNewPost, 
    updatePostById,
    deletePostById,
    getAllPostsForUserById,
    getPostsForPeerById,
    getLikeByIds,
    addLikeToPostById,
    removeLikeFromPostById,
}