const prisma = require('../config/db');
const bcrypt = require('bcryptjs');

const createUserOne = async () => {
    const hashedPassword = await bcrypt.hash('test1', 10);
    return prisma.user.create({
        data: {
            firstName: 'test1',
            lastName: 'test1',
            email: 'test1@gmail.com',
            passwordHash: hashedPassword,
            profilePicFilePath: 'test1.jpg',
            profilePicCloudId: 'test1',
            city: 'test1',
            birthDate: new Date('2000-01-01')
        },
    });
};

module.exports = createUserOne;