const db = require('../models/userModels');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { validationResult, matchedData } = require('express-validator');

// logs in user to passport local session
function logInUser(req, res, next) { 
    const authenticateUser = passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        };

        if (!user) {
            return res.status(401).json({
                message: info?.message || 'Invalid username or password',
            });
        };

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            };

            return res.status(200).json({
                message: 'Successfully logged in',
                success: true,
                user: req.user,
            });
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
                res.sendStatus(204);
            });
        });
    } catch(err) {
        next(err);
    };
};

// gets user from database using id
async function findUser(req, res, next) {
    const id = req.validatedId;

    try {
        const foundUser = await db.getUserById(id);
        if (!foundUser) {
            return res.status(400).json({
                message: 'Failed finding user',
            });
        };

        return res.status(200).json({
            message: 'Successfully found user',
            foundUser: foundUser,
        });
    } catch(err) {
        next(err);
    };
};

// creates new user in database
async function createUser(req, res, next) {
    const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Invalid credentials to create new user',
            });
        };

    try {
        const { firstName, lastName, username, password, city, birthDate } = matchedData(req);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await db.createNewUser(firstName, lastName, username, hashedPassword, city, birthDate);
        if (!newUser) {
            return res.status(400).json({
                message: 'Failed creating new user',
            });  
        };

        return res.status(200).json({
            message: 'Successfully created new user',
            newUser: newUser,
        });
    } catch(err) {
        next(err);
    };
};

// updates user in database
async function updateUser(req, res, next) {
    const errors = validationResult(req);
    const id = req.validatedId;

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Invalid credentials to update user'
            });
        };

    try {
        const { firstName, lastName, username, password, city, birthDate } = matchedData(req);
        if (password !== '') {
            const hashedPassword = await bcrypt.hash(password, 10);
            const updatedUser = await db.updateUserById(firstName, lastName, username, hashedPassword, city, birthDate, id);
            return res.status(200).json(updatedUser);
        };

        const user = await db.getUserById(id);
        const updatedUser = await db.updateUserById(firstName, lastName, username, user.password, city, birthDate, id);
        return res.status(200).json(updatedUser);
    } catch(err) {
        next(err);
    };
};

// deletes user from database
async function deleteUser(req, res, next) {
    const id = req.validatedId;

    try {
        await db.deleteUserById(id);
        return res.sendStatus(204);
    } catch(err) {
        next(err);
    };
};

async function sendUserDetails(req, res, next) {
    try {
        res.json(req.user);
    } catch(err) {
        next(err)
    };
};

async function getPeerPool(req, res, next) {
    const id = req.validatedId;

    try {
        const users = await db.getPeerPool(id);
        return res.status(200).json({
            message: 'Successfully retrieved users',
            users: users,
        });
    } catch(err) {
        next(err);
    };
};

async function addFollowRequestToUser(req, res, next) {
    const userId = req.validatedUserId;
    const id = req.validatedId;
    try {
        const request = await db.addFollowRequestToUser(userId, id);
        if (!request) {
            return res.status(400).json({
                message: 'Failed sending follow request',
            });
        };

        return res.status(200).json({
            message: 'Successfully sent follow request',
        });
    } catch(err) {
        next(err);
    };
};

async function addFollowerAndRemoveRequest(req, res, next) {
    const userId = req.validatedUserId;
    const id = req.validatedId;
    try {
        const request = await db.addFollowerAndRemoveRequest(userId, id);
        if (!request) {
            return res.status(400).json({
                message: 'Failed adding follower',
            });
        };

        return res.status(200).json({
            message: 'Successfully added follower',
            follower: request,
        });
    } catch(err) {
        next(err);
    };
};

async function removeFollower(req, res, next) {
    const userId = req.validatedUserId;
    const id = req.validatedId;
    try {
        await db.removeFollower(userId, id);
        return res.sendStatus(204);
    } catch(err) {
        next(err);
    };
};

module.exports = {
    logInUser,
    logOutUser,
    findUser,
    createUser,
    updateUser,
    deleteUser,
    sendUserDetails,
    getPeerPool,
    addFollowRequestToUser,
    addFollowerAndRemoveRequest,
    removeFollower,
}