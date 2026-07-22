const request = require('supertest');
const app = require('../app');
const prisma = require('../../config/db');
const bcrypt = require('bcryptjs');

async function createAgent() {
    const firstName = 'Jane'
    const lastName = 'Doe'
    const username = 'janedoe@gmail.com'
    const password = '123';
    const filePath = 'https://res.cloudinary.com/desbleq8y/image/upload/v1784029820/stock_mfe6q5.jpg';
    const cloudinaryId = 'stock_mfe6q5';
    const city = 'Toronto'
    const birthDate = new Date('2000-01-01');

    const hashedPassword = await bcrypt.hash(password, 10);

    const agent = request.agent(app);

    const user = await prisma.user.create({
        data: {
            firstName: firstName,
            lastName: lastName,
            email: username,
            passwordHash: hashedPassword,
            profilePicFilePath: filePath,
            profilePicCloudId: cloudinaryId,
            city: city,
            birthDate: birthDate,
        }
    });

    await agent
        .post('/api/users/login')
        .send({ username, password })
        .expect(200);

    return { agent, user };
};

module.exports = { createAgent };