const db = require('../models/userModels');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { validationResult, matchedData } = require('express-validator');
const { uploadToCloudinary, cloudinary } = require('../config/cloudinary');
const success = require('../utils/success');
const failure = require('../utils/failure');

// logs in user to passport local session 
function logInUser(req, res, next) {
    const authenticateUser = passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        };

        // if user does not exist, return a 401 failure response
        if (!user) {
            // return failure(res, 401, info?.message || 'Invalid username or password');
            const error = new Error('Invalid username or password');
            error.status = 401
            return next(error);
        };

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            };

            // return a 200 success response with the logged in user
            return success(res, 200, 'Successfully logged in', req.user)
        });
    }
    );

    authenticateUser(req, res, next)
};

// logs out user from passport local session
async function logOutUser(req, res, next) {
    try {
        req.logout((err) => {
            if (err) {
                return next(err);
            };

            req.session.destroy((err) => {
                if (err) {
                    return next(err);
                };

                res.clearCookie('connect.sid');
                // return a 204 success response indicating the user is logged out
                return success(res, 204);
            });
        });
    } catch (err) {
        next(err);
    };
};

// obtains a single user from the database by user ID
async function findUser(req, res, next) {
    const id = req.validatedId;

    try {
        const foundUser = await db.getUserById(id);
        // if no user is found, return a 404 failure response
        if (!foundUser) {
            return next(failure(404, 'Failed finding user'));
        };

        // return a 200 success response with the found user
        return success(res, 200, 'Successfully found user', foundUser);
    } catch (err) {
        next(err);
    };
};

// creates a new user database entry
async function createUser(req, res, next) {
    const errors = validationResult(req);
    let filePath, cloudinaryId;

    // if there are any form validation errors, return a 400 failure response
    if (!errors.isEmpty()) {
        return next(failure(400, 'Form fields contain invalid data'));
    };

    try {
        // if no file is uploaded with the form, assign a default profile picture
        if (!req.file) {
            filePath = 'https://res.cloudinary.com/desbleq8y/image/upload/v1784029820/stock_mfe6q5.jpg';
            cloudinaryId = 'stock_mfe6q5';
        } else {
            // if file is uploaded with the form, upload it to cloudinary and return the filepath URL and cloudinary ID
            const cloudinaryResult = await uploadToCloudinary(req.file.buffer);
            filePath = cloudinaryResult.secure_url;
            cloudinaryId = cloudinaryResult.public_id;
        }

        const { firstName, lastName, username, password, city, birthDate } = matchedData(req);
        // encrypt password using bcryptjs
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await db.createNewUser(firstName, lastName, username, hashedPassword, filePath, cloudinaryId, city, birthDate);
        // return a 201 success response with the new user
        return success(res, 201, 'Successfully created new user', newUser);
    } catch (err) {
        next(err);
    };
};

// updates an existing user database entry by user ID
async function updateUser(req, res, next) {
    const errors = validationResult(req);
    const userId = req.user.id;

    // if there are any form validation errors, return a 400 failure response
    if (!errors.isEmpty()) {
        return next(failure(400, 'Form fields contain invalid data'));
    };

    try {
        // looks through database to ensure the user exists before updating
        const user = await db.getUserById(userId);
        // if no user is found, return a 404 failure response
        if (!user) {
            return next(failure(404, 'Failed finding user'));
        };

        // if user id does not match the current user, return a 403 failure response
        if (user.id !== userId) {
            return next(failure(403, 'Access forbidden'));
        };

        const { firstName, lastName, username, password, city, birthDate } = matchedData(req);
        // if password entry from form is filled in with a new password, re-encrypt the new password and update user
        if (password !== '') {
            const hashedPassword = await bcrypt.hash(password, 10);
            const updatedUser = await db.updateUserById(firstName, lastName, username, hashedPassword, city, birthDate, userId);
            // return a 200 success response with the updated user
            return success(res, 200, 'Successfully updated user', updatedUser);
        };

        // if password entry from form is left empty, update user with new details but use previous password from found user
        const updatedUser = await db.updateUserById(firstName, lastName, username, user.password, city, birthDate, userId);
        // return a 200 success response with the updated user
        return success(res, 200, 'Successfully updated user', updatedUser);
    } catch (err) {
        next(err);
    };
};

// updates an existing user's profile picture details by user ID
async function updateUserProfilePic(req, res, next) {
    const userId = req.user.id;
    let filePath, cloudinaryId;

    try {
        // looks through database to ensure the user exists before updating
        const user = await db.getUserById(userId);
        // if no user is found, return a 404 failure response
        if (!user) {
            return next(failure(404, 'Failed finding user'));
        };

        // if user id does not match the current user, return a 403 failure response
        if (user.id !== userId) {
            return next(failure(404, 'Access forbidden'));
        };

        // if no file is uploaded with the form, re-assign the found user's profile pic details
        if (!req.file) {
            filePath = user.profilePicFilePath;
            cloudinaryId = user.profilePicCloudId;
        } else {
            // if file is uploaded with the form, upload it to cloudinary and return the filepath URL and cloudinary ID
            const cloudinaryResult = await uploadToCloudinary(req.file.buffer);
            filePath = cloudinaryResult.secure_url;
            cloudinaryId = cloudinaryResult.public_id;
        }

        const updatedUser = await db.updateUserProfilePicById(userId, filePath, cloudinaryId);
        // return a 200 success response with the updated user
        return success(res, 200, 'Successfully updated user', updatedUser);
    } catch (err) {
        next(err);
    };
};

// deletes an existing user database entry by user ID
async function deleteUser(req, res, next) {
    const userId = req.user.id;

    try {
        // looks through database to ensure the user exists before deleting
        const user = await db.getUserById(userId);
        // if no user is found, return a 404 failure response
        if (!user) {
            return next(failure(404, 'Failed finding user'));
        };

        // if user id does not match the current user, return a 403 failure response
        if (user.id !== userId) {
            return next(failure(403, 'Access forbidden'));
        };

        await db.deleteUserById(userId);
        // return a 204 success response indicating the user was deleted
        return success(res, 204);
    } catch (err) {
        next(err);
    };
};

// obtain user details from passport session
async function sendUserDetails(req, res, next) {
    try {
        // return a 200 success response with either the current req.user from local passport strategy or null if none exists
        return res.status(200).json(req.user ?? null);
    } catch (err) {
        next(err)
    };
};

// obtains all peers for current user by user ID
async function getPeerPool(req, res, next) {
    const userId = req.user.id;

    try {
        const users = await db.getPeerPool(userId);
        // return a 200 success response with the found users
        return success(res, 200, 'Successfully found users', users);
    } catch (err) {
        next(err);
    };
};

// obtains all peers for current peer by current peer ID
async function getPeerPoolForPeer(req, res, next) {
    const id = req.validatedId;

    try {
        const users = await db.getPeerPoolForPeer(id);
        // return a 200 success response with the found users
        return success(res, 200, 'Successfully found users', users);
    } catch (err) {
        next(err);
    };
};

// creates a new follow request database entry
async function addFollowRequestToUser(req, res, next) {
    const userId = req.user.id;
    const peerId = req.validatedId;

    if (userId === peerId) {
        return next(failure(422, 'Follow requests cannot be linked to yourself'));
    };

    try {
        const request = await db.addFollowRequestToUser(userId, peerId);
        // return a 201 success response with the new request
        return success(res, 201, 'Successfully sent follow request', request);
    } catch (err) {
        next(err);
    };
};

// deletes an existing follow request database entry by user ID and peer ID
async function removeFollowRequestFromUser(req, res, next) {
    const userId = req.user.id;
    const peerId = req.validatedId;

    try {
        // looks through database to ensure the follow request exists before deleting
        const followRequest = await db.getFollowRequestByIds(userId, peerId);
        // if no follow request is found, return a 404 failure response
        if (!followRequest) {
            return next(failure(404, 'Failed finding follow request'));
        };

        await db.removeFollowRequestFromUser(userId, peerId);
        // return a 204 success response indicating the follow request was deleted
        return success(res, 204);
    } catch (err) {
        next(err);
    };
};

// deletes an existing follow request database entry by peer ID and user ID
async function declineFollowRequestFromUser(req, res, next) {
    const userId = req.user.id;
    const peerId = req.validatedId;

    try {
        // looks through database to ensure the follow request exists before deleting
        const followRequest = await db.getFollowRequestByIds(peerId, userId);
        // if no follow request is found, return a 404 failure response
        if (!followRequest) {
            return next(failure(404, 'Failed finding follow request'));
        };

        await db.removeFollowRequestFromUser(peerId, userId);
        // return a 204 success response indicating the follow request was deleted
        return success(res, 204);
    } catch (err) {
        next(err);
    };
};

// creates a new follow database entry and deletes an existing follow request database entry by user ID and peer ID
async function addFollowerAndRemoveRequestFromUser(req, res, next) {
    const userId = req.user.id;
    const peerId = req.validatedId;

    if (userId === peerId) {
        return next(failure(422, 'Follow requests cannot be linked to yourself'));
    };

    try {
        // looks through database to ensure the follow request exists before deleting
        const followRequest = await db.getFollowRequestByIds(peerId, userId);
        // if no follow request is found, return a 404 failure response
        if (!followRequest) {
            return next(failure(404, 'Failed finding follow request'));
        };

        const deleteRequest = await db.removeFollowRequestFromUser(peerId, userId);
        const addRequest = await db.addFollowerToUser(userId, peerId);
        // return a 201 success response with the new follower
        return success(res, 201, 'Successfully added follower', addRequest);
    } catch (err) {
        next(err);
    };
};

// deletes an existing follow database entry by user ID and peer ID
async function removeFollower(req, res, next) {
    const userId = req.user.id;
    const peerId = req.validatedId;

    try {
        // looks through database to ensure the follower exists before deleting
        const follower = await db.getFollowerByIds(userId, peerId);
        // if no follower is found, return a 404 failure response
        if (!follower) {
            return next(failure(404, 'Failed finding follower'));
        };
        
        await db.removeFollower(userId, peerId);
        // return a 204 success response indicating the follower was deleted
        return success(res, 204);
    } catch (err) {
        next(err);
    };
};

module.exports = {
    logInUser,
    logOutUser,
    findUser,
    createUser,
    updateUser,
    updateUserProfilePic,
    deleteUser,
    sendUserDetails,
    getPeerPool,
    getPeerPoolForPeer,
    addFollowRequestToUser,
    removeFollowRequestFromUser,
    declineFollowRequestFromUser,
    addFollowerAndRemoveRequestFromUser,
    removeFollower,
}