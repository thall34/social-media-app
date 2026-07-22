const request = require('supertest');
const app = require('./app');
const prisma = require('../config/db');
const { createAgent } = require('./createAgent');
const createUserOne = require('./createUserOne');
const createPostOne = require('./createPostOne');
const createLike = require('./createLike');

beforeEach(async () => {
    await prisma.post.deleteMany({});
    await prisma.user.deleteMany({});
})

afterAll(async () => {
    await prisma.$disconnect();
});

describe('GET /api/posts/all', () => {
    it('should return with a 401 error if user is not logged in', async () => {
        const res = await request(app)
            .get('/api/posts/all')
            .expect(401);

        expect(res.body).toHaveProperty('message', 'Not Authenticated')
    });

    it('should return a 200 status and an array', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .get('/api/posts/all')
            .expect(200);

        expect(res.body.data).toEqual([]);
    });
});

describe('GET /api/posts/peer/:id', () => {
    it('should return with a 401 error if user is not logged in', async () => {
        const res = await request(app)
            .get('/api/posts/peer/1')
            .expect(401);

        expect(res.body).toHaveProperty('message', 'Not Authenticated')
    });

    it('should return with a 404 error if peer does not exist', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .get('/api/posts/peer/1')
            .expect(404);

        expect(res.body).toHaveProperty('message', 'User not found')
    });

    it('should return a 200 status and an array', async () => {
        const { agent, user } = await createAgent();
        const newUser = await createUserOne();
        const res = await agent
            .get(`/api/posts/peer/${newUser.id}`)
            .expect(200);

        expect(res.body.data).toEqual([]);
    });
});

describe('GET /api/posts/:id', () => {
    it('should return with a 401 error if user is not logged in', async () => {
        const res = await request(app)
            .get('/api/posts/1')
            .expect(401);

        expect(res.body).toHaveProperty('message', 'Not Authenticated')
    });

    it('should return with a 404 error if post does not exist', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .get('/api/posts/1000000')
            .expect(404);

        expect(res.body).toHaveProperty('message', 'Post not found')
    });

    it('should return a 200 status and the message object', async () => {
        const { agent, user } = await createAgent();
        const newPost = await createPostOne(user.id);
        const res = await agent
            .get(`/api/posts/${newPost.id}`)
            .expect(200);

        expect(res.body.data.text).toEqual('test1');
    });
});

describe('POST /api/posts', () => {
    it('should return with a 401 error if user is not logged in', async () => {
        const res = await request(app)
            .post('/api/posts')
            .expect(401);

        expect(res.body).toHaveProperty('message', 'Not Authenticated')
    });

    it('should return with a 400 error if form fields are invalid or missing', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .post('/api/posts')
            .send({})
            .expect(400);

        expect(res.body).toHaveProperty('message', 'Form fields contain invalid data')
    });

    it('should return a 201 status and the message object', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .post('/api/posts')
            .send({ text: 'test1' })
            .expect(201);

        expect(res.body.data.text).toEqual('test1');
    });
});

describe('POST /api/posts/likes/:id', () => {
    it('should return with a 401 error if user is not logged in', async () => {
        const res = await request(app)
            .post('/api/posts/likes/1')
            .expect(401);

        expect(res.body).toHaveProperty('message', 'Not Authenticated')
    });

    it('should return with a 404 error if post is not found', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .post('/api/posts/likes/1000000')
            .expect(404);

        expect(res.body).toHaveProperty('message', 'Post not found')
    });

    it('should return a 201 status and the like object', async () => {
        const { agent, user } = await createAgent();
        const newPost = await createPostOne(user.id);
        const res = await agent
            .post(`/api/posts/likes/${newPost.id}`)
            .expect(201);

        expect(res.body.data.postId).toEqual(newPost.id);
    });
});

describe('PUT /api/posts/:id', () => {
    it('should return with a 401 error if user is not logged in', async () => {
        const res = await request(app)
            .put('/api/posts/1')
            .expect(401);

        expect(res.body).toHaveProperty('message', 'Not Authenticated')
    });

    it('should return with a 400 error if form fields are invalid or missing', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .put('/api/posts/1')
            .send({})
            .expect(400);

        expect(res.body).toHaveProperty('message', 'Form fields contain invalid data')
    });

    it('should return with a 404 error if post is not found', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .put('/api/posts/1000000')
            .send({ text: 'test' })
            .expect(404);

        expect(res.body).toHaveProperty('message', 'Post not found')
    });

    it('should return with a 403 error if post author is not the current user', async () => {
        const { agent, user } = await createAgent();
        const newUser = await createUserOne();
        const newPost = await createPostOne(newUser.id);
        const res = await agent
            .put(`/api/posts/${newPost.id}`)
            .send({ text: 'test' })
            .expect(403);

        expect(res.body).toHaveProperty('message', 'Access forbidden')
    });

    it('should return a 200 status and the message object', async () => {
        const { agent, user } = await createAgent();
        const newPost = await createPostOne(user.id);
        const res = await agent
            .put(`/api/posts/${newPost.id}`)
            .send({ text: 'test2' })
            .expect(200);

        expect(res.body.data.text).toEqual('test2');
    });
});

describe('DELETE /api/posts/:id', () => {
    it('should return with a 401 error if user is not logged in', async () => {
        const res = await request(app)
            .delete('/api/posts/1')
            .expect(401);

        expect(res.body).toHaveProperty('message', 'Not Authenticated')
    });

    it('should return with a 404 error if post is not found', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .delete('/api/posts/1000000')
            .expect(404);

        expect(res.body).toHaveProperty('message', 'Post not found')
    });

    it('should return with a 403 error if post author is not the current user', async () => {
        const { agent, user } = await createAgent();
        const newUser = await createUserOne();
        const newPost = await createPostOne(newUser.id);
        const res = await agent
            .delete(`/api/posts/${newPost.id}`)
            .expect(403);

        expect(res.body).toHaveProperty('message', 'Access forbidden')
    });

    it('should return a 204 status if post is deleted', async () => {
        const { agent, user } = await createAgent();
        const newPost = await createPostOne(user.id);
        const res = await agent
            .delete(`/api/posts/${newPost.id}`)
            .expect(204);
    });
});

describe('DELETE /api/posts/likes/:id', () => {
    it('should return with a 401 error if user is not logged in', async () => {
        const res = await request(app)
            .delete('/api/posts/likes/1')
            .expect(401);

        expect(res.body).toHaveProperty('message', 'Not Authenticated')
    });

    it('should return with a 404 error if post is not found', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .delete('/api/posts/likes/1000000')
            .expect(404);

        expect(res.body).toHaveProperty('message', 'Post not found')
    });

    it('should return with a 404 error if like on post does not exist', async () => {
        const { agent, user } = await createAgent();
        const newPost = await createPostOne(user.id);
        const res = await agent
            .delete(`/api/posts/likes/${newPost.id}`)
            .expect(404);

        expect(res.body).toHaveProperty('message', 'Like not found')
    });

    it('should return a 204 status if post is deleted', async () => {
        const { agent, user } = await createAgent();
        const newPost = await createPostOne(user.id);
        const like = await createLike(newPost.id, user.id);
        const res = await agent
            .delete(`/api/posts/likes/${newPost.id}`)
            .expect(204);
    });
});