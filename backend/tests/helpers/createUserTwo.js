const prisma = require('../../config/db');
const bcrypt = require('bcryptjs');

const createUserTwo = async () => {
    const hashedPassword = await bcrypt.hash('test2', 10);
    return prisma.user.create({
        data: {
            firstName: 'test2',
            lastName: 'test2',
            email: 'test2@gmail.com',
            passwordHash: hashedPassword,
            profilePicFilePath: 'test2.jpg',
            profilePicCloudId: 'test2',
            city: 'test2',
            birthDate: new Date('2000-01-01')
        },
    });
};

module.exports = createUserTwo;