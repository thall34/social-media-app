const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function main() {
    await prisma.user.deleteMany();
    const hashedPassword = await bcrypt.hash('123', 10);
    
    const guestUser = await prisma.user.upsert({
        where: { email: 'guest@example.com' },
        update: {},
        create: {
            firstName: 'Guest',
            lastName: '',
            email: 'guest@example.com',
            passwordHash: hashedPassword,
            profilePicFilePath: 'https://res.cloudinary.com/desbleq8y/image/upload/v1784029820/stock_mfe6q5.jpg',
            profilePicCloudId: 'stock_mfe6q5',
            city: 'Timbuktu',
            birthDate: new Date('2000-01-01'),
            role: 'GUEST',
        },
    });

    console.log('Database successfully seeded');
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });