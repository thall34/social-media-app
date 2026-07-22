const request = require('supertest');
const app = require('./app');
const prisma = require('../config/db');
const { createAgent } = require('./createAgent');
const createUserOne = require('./createUserOne');
const createUserTwo = require('./createUserTwo');
const createFollow = require('./createFollow');
const createFollowRequest = require('./createFollowRequest');
const { user1, user2 } = require('./preMadeUserDetails');

beforeEach(async () => {
    await prisma.user.deleteMany({});
})

afterAll(async () => {
    await prisma.$disconnect();
});

describe('API Error routing', () => {
    it('should return 404 and Invalid URL error for a bad path', async () => {
        const res = await request(app)
            .get('/api/invalid-path')
            .expect('Content-Type', /json/)
            .expect(404);

        expect(res.body).toHaveProperty('message', 'Invalid URL');
    });
});

describe('GET /api/users/me', () => {
    it('should return null if user is not logged in', async () => {
        const res = await request(app)
            .get('/api/users/me')
            .expect(200);
        
        expect(res.body).toEqual(null);
    });

    it('should return with user if user is logged in', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .get('/api/users/me')
            .expect(200);
        
        expect(res.body.email).toEqual(user.email);
    });
});

describe('GET /api/users/pool', () => {
    it('should return with a 401 error if user is not logged in', async () => {
        const res = await request(app)
            .get('/api/users/pool')
            .expect(401);

        expect(res.body).toHaveProperty('message', 'Not Authenticated')
    });

    it('should return with an empty array if only one user is in database', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .get('/api/users/pool')
            .expect(200);

        expect(res.body.data).toEqual([]);
    });

    it('should return with an array of one user if a second user is in database', async () => {
        const { agent, user } = await createAgent();
        const newUser = await createUserOne();

        const res = await agent
            .get('/api/users/pool')
            .expect(200);

        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data[0].email).toEqual(newUser.email);
    });
});

describe('GET /api/users/peer/:id/pool', () => {
    it('should return with a 401 error if user is not logged in', async () => {
        const res = await request(app)
            .get('/api/users/peer/1/pool')
            .expect(401);

        expect(res.body).toHaveProperty('message', 'Not Authenticated')
    });

    it('should return with a 401 error message if peer does not exist', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .get('/api/users/peer/1000000/pool')
            .expect(404);

        expect(res.body).toHaveProperty('message', 'User not found');
    });

    it('should return with an empty array if there is only one user besides the test agent', async () => {
        const { agent, user } = await createAgent();
        const newUser = await createUserOne();

        const res = await agent
            .get(`/api/users/peer/${newUser.id}/pool`)
            .expect(200);

        expect(res.body.data).toEqual([]);
    });

    it('should return with an array of one user if there are three users in the database', async () => {
        const { agent, user } = await createAgent();
        const newUser1 = await createUserOne();
        const newUser2 = await createUserTwo();
        const follow = await createFollow(newUser1.id, newUser2.id);

        const res = await agent
            .get(`/api/users/peer/${newUser1.id}/pool`)
            .expect(200);

        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data[0].followed.firstName).toEqual(newUser2.firstName)
    });
});

describe('GET /api/users/peer/:id', () => {
    it('should return with a 401 error if user is not logged in', async () => {
        const res = await request(app)
            .get('/api/users/peer/1')
            .expect(401);

        expect(res.body).toHaveProperty('message', 'Not Authenticated')
    });

    it('should return with a 404 error message if peer does not exist', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .get('/api/users/peer/1000000')
            .expect(404);

        expect(res.body).toHaveProperty('message', 'User not found');
    });

    it('should return with the user object if it exists', async () => {
        const { agent, user } = await createAgent();
        const newUser = await createUserOne();

        const res = await agent
            .get(`/api/users/peer/${newUser.id}`)
            .expect(200);

        expect(res.body.data.email).toEqual(newUser.email);
    });
});

describe('POST /api/users', () => {
    it('should return a 400 error if some or all fields are missing or invalid', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({})
            .expect(400);
        
        expect(res.body).toHaveProperty('message', 'Form fields contain invalid data')
    });

    it('should return a 201 status and user details of the new user', async () => {
        const res = await request(app)
            .post('/api/users')
            .send(user1)
            .expect(201);
        
        expect(res.body.data.email).toEqual(user1.username)
    });
});

describe('POST /api/users/login', () => {
    it('should return a 401 error if login credentials are invalid or missing', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({})
            .expect(401);

        expect(res.body).toHaveProperty('message', 'Invalid username or password')
    });

    it('should return a 200 status with user details for the current logged in user if login is valid', async () => {
        const newUser = await createUserOne();
        const res = await request(app)
            .post('/api/users/login')
            .send({ username: 'test1@gmail.com', password: 'test1' })
            .expect(200);

        expect(res.body.data.email).toEqual(newUser.email);
    });
});

describe('Post /api/users/logout', () => {
    it('should return a 204 statement', async () => {
        const res = await request(app)
            .post('/api/users/logout')
            .expect(204);
    });
});

describe('POST /api/users/follow-request/:id', () => {
    it('should return with a 401 error if user is not logged in', async () => {
        const res = await request(app)
            .post('/api/users/follow-request/1')
            .expect(401);

        expect(res.body).toHaveProperty('message', 'Not Authenticated')
    });

    it('should return with a 422 error message trying to send a follow request to yourself', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .post(`/api/users/follow-request/${user.id}`)
            .expect(422);

        expect(res.body).toHaveProperty('message', 'Follow requests cannot be linked to yourself');
    });

    it('should return with a 201 status if follow request is valid', async () => {
        const { agent, user } = await createAgent();
        const newUser = await createUserOne();
        const res = await agent
            .post(`/api/users/follow-request/${newUser.id}`)
            .expect(201);

        expect(res.body.data.followedUserId).toEqual(newUser.id);
    });
});

describe('POST /api/users/follow/:id', () => {
    it('should return with a 401 error if user is not logged in', async () => {
        const res = await request(app)
            .post('/api/users/follow/1')
            .expect(401);

        expect(res.body).toHaveProperty('message', 'Not Authenticated')
    });

    it('should return with a 422 error message trying to send a follow request to yourself', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .post(`/api/users/follow/${user.id}`)
            .expect(422);

        expect(res.body).toHaveProperty('message', 'Following cannot be linked to yourself');
    });

    it('should return with a 404 status if there is no follow request currently between the user and peer', async () => {
        const { agent, user } = await createAgent();
        const newUser = await createUserOne();
        const res = await agent
            .post(`/api/users/follow/${newUser.id}`)
            .expect(404);

        expect(res.body).toHaveProperty('message', 'Follow request not found');
    });

    it('should return with a 201 status if the follow is valid and it removes the old follow request', async () => {
        const { agent, user } = await createAgent();
        const newUser = await createUserOne();
        const followRequest = await createFollowRequest(newUser.id, user.id)
        const res = await agent
            .post(`/api/users/follow/${newUser.id}`)
            .expect(201);

        expect(res.body.data.followedUserId).toEqual(user.id);
    });
});

describe('PUT /api/users', () => {
    it('should return with a 401 error if user is not logged in', async () => {
        const res = await request(app)
            .put('/api/users')
            .expect(401);

        expect(res.body).toHaveProperty('message', 'Not Authenticated');
    });

    it('should return with a 400 error if form fields are invalid or empty', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .put('/api/users')
            .send({})
            .expect(400);

        expect(res.body).toHaveProperty('message', 'Form fields contain invalid data');
    });

    it('should return with a 200 status if the current user is updated', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .put('/api/users')
            .send({
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.email,
                password: '',
                city: user.city,
                birthDate: '2000-01-01'
            })
            .expect(200);

        expect(res.body.data.email).toEqual(user.email);
    });
});

describe('PUT /api/users/picture', () => {
    it('should return with a 401 error if user is not logged in', async () => {
        const res = await request(app)
            .put('/api/users/picture')
            .expect(401);

        expect(res.body).toHaveProperty('message', 'Not Authenticated');
    });

    it('should return with a 200 status if the current user profile pic is updated or if no file is uploaded', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .put('/api/users/picture')
            .expect(200);

        expect(res.body.data.email).toEqual(user.email);
    });
});

describe('DELETE /api/users', () => {
    it('should return with a 401 error if user is not logged in', async () => {
        const res = await request(app)
            .delete('/api/users')
            .expect(401);

        expect(res.body).toHaveProperty('message', 'Not Authenticated');
    });

    it('should return with a 204 status if the current user is deleted', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .delete('/api/users')
            .expect(204);
    });
});

describe('DELETE /api/users/follow-request/cancel/:id', () => {
    it('should return with a 401 error if user is not logged in', async () => {
        const res = await request(app)
            .delete('/api/users/follow-request/cancel/1')
            .expect(401);

        expect(res.body).toHaveProperty('message', 'Not Authenticated');
    });

    it('should return with a 404 status if the follow request does not exist to delete', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .delete('/api/users/follow-request/cancel/1')
            .expect(404);

        expect(res.body).toHaveProperty('message', 'Follow request not found');
    });

    it('should return with a 204 status if the follow request was cancelled', async () => {
        const { agent, user } = await createAgent();
        const newUser = await createUserOne();
        const followRequest = await createFollowRequest(user.id, newUser.id);
        const res = await agent
            .delete(`/api/users/follow-request/cancel/${newUser.id}`)
            .expect(204);
    });
});

describe('DELETE /api/users/follow-request/decline/:id', () => {
    it('should return with a 401 error if user is not logged in', async () => {
        const res = await request(app)
            .delete('/api/users/follow-request/decline/1')
            .expect(401);

        expect(res.body).toHaveProperty('message', 'Not Authenticated');
    });

    it('should return with a 404 status if the follow request does not exist to delete', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .delete('/api/users/follow-request/decline/1')
            .expect(404);

        expect(res.body).toHaveProperty('message', 'Follow request not found');
    });

    it('should return with a 204 status if the follow request was declined', async () => {
        const { agent, user } = await createAgent();
        const newUser = await createUserOne();
        const followRequest = await createFollowRequest(newUser.id, user.id);
        const res = await agent
            .delete(`/api/users/follow-request/decline/${newUser.id}`)
            .expect(204);
    });
});

describe('DELETE /api/users/follow/:id', () => {
    it('should return with a 401 error if user is not logged in', async () => {
        const res = await request(app)
            .delete('/api/users/follow/1')
            .expect(401);

        expect(res.body).toHaveProperty('message', 'Not Authenticated');
    });

    it('should return with a 404 status if the follower does not exist to delete', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .delete('/api/users/follow/1')
            .expect(404);

        expect(res.body).toHaveProperty('message', 'Follower not found');
    });

    it('should return with a 204 status if the follower was deleted', async () => {
        const { agent, user } = await createAgent();
        const newUser = await createUserOne();
        const follow = await createFollow(newUser.id, user.id);
        const res = await agent
            .delete(`/api/users/follow/${newUser.id}`)
            .expect(204);
    });
});