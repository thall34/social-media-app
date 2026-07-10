const prisma = require('../config/db');

// NOTE FOR ALL USERNAME QUERIES - EMAIL IS BEING USED AS USERNAME

async function getUserByUsername(username) {
    const user = await prisma.user.findUnique({
        where: { email: username},
    });

    return user;
};

async function getUserById(id) {
    const user = await prisma.user.findUnique({
        where: { id: id },
        include: {
            posts: true,
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

module.exports = {
    getUserByUsername,
    getUserById,
    createNewUser,
    updateUserById,
    deleteUserById,
};