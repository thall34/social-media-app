const request = require('supertest');
const app = require('./app');
const prisma = require('../config/db');
const { createAgent } = require('./helpers/createAgent');
const createUserOne = require('./helpers/createUserOne');
const createPostOne = require('./helpers/createPostOne');
const createCommentOne = require('./helpers/createCommentOne');

beforeEach(async () => {
    await prisma.comment.deleteMany({});
    await prisma.post.deleteMany({});
    await prisma.user.deleteMany({});
});

afterAll(async () => {
    await prisma.$disconnect();
});

describe('GET /api/comments/:id', () => {
    it('should return with a 401 error if user is not logged in', async () => {
        const res = await request(app)
            .get('/api/comments/1')
            .expect(401);

        expect(res.body).toHaveProperty('message', 'Not Authenticated')
    });

    it('should return with a 404 error if comment does not exist', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .get('/api/comments/1000000')
            .expect(404);

        expect(res.body).toHaveProperty('message', 'Comment not found')
    });

    it('should return a 200 status and the comment object', async () => {
        const { agent, user } = await createAgent();
        const newPost = await createPostOne(user.id);
        const newComment = await createCommentOne(user.id, newPost.id)
        const res = await agent
            .get(`/api/comments/${newComment.id}`)
            .expect(200);

        expect(res.body.data.text).toEqual('test1');
    });
});

describe('POST /api/comments/post/:postId', () => {
    it('should return with a 401 error if user is not logged in', async () => {
        const res = await request(app)
            .post('/api/comments/post/1')
            .expect(401);

        expect(res.body).toHaveProperty('message', 'Not Authenticated')
    });

    it('should return with a 400 error if form fields are missing or invalid', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .post('/api/comments/post/1')
            .send({})
            .expect(400);

        expect(res.body).toHaveProperty('message', 'Form fields contain invalid data')
    });

    it('should return a 201 status and the comment object', async () => {
        const { agent, user } = await createAgent();
        const newPost = await createPostOne(user.id);
        const res = await agent
            .post(`/api/comments/post/${newPost.id}`)
            .send({ text: 'test1' })
            .expect(201);

        expect(res.body.data.text).toEqual('test1');
    });
});

describe('PUT /api/comments/:id', () => {
    it('should return with a 401 error if user is not logged in', async () => {
        const res = await request(app)
            .put('/api/comments/1')
            .expect(401);

        expect(res.body).toHaveProperty('message', 'Not Authenticated')
    });

    it('should return with a 400 error if form fields are missing or invalid', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .put('/api/comments/1')
            .send({})
            .expect(400);

        expect(res.body).toHaveProperty('message', 'Form fields contain invalid data')
    });

    it('should return with a 404 error if comment does not exist', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .put('/api/comments/1000000')
            .send({ text: 'test' })
            .expect(404);

        expect(res.body).toHaveProperty('message', 'Comment not found')
    });

    it('should return with a 403 error if comment author is not the current user', async () => {
        const { agent, user } = await createAgent();
        const newUser = await createUserOne();
        const newPost = await createPostOne(user.id);
        const newComment = await createCommentOne(newUser.id, newPost.id);
        const res = await agent
            .put(`/api/comments/${newComment.id}`)
            .send({ text: 'test' })
            .expect(403);

        expect(res.body).toHaveProperty('message', 'Access forbidden')
    });

    it('should return a 200 status and the comment object', async () => {
        const { agent, user } = await createAgent();
        const newPost = await createPostOne(user.id);
        const newComment = await createCommentOne(user.id, newPost.id);
        const res = await agent
            .put(`/api/comments/${newComment.id}`)
            .send({ text: 'test2' })
            .expect(200);

        expect(res.body.data.text).toEqual('test2');
    });
});

describe('DELETE /api/comments/:id', () => {
    it('should return with a 401 error if user is not logged in', async () => {
        const res = await request(app)
            .delete('/api/comments/1')
            .expect(401);

        expect(res.body).toHaveProperty('message', 'Not Authenticated')
    });

    it('should return with a 404 error if comment does not exist', async () => {
        const { agent, user } = await createAgent();
        const res = await agent
            .delete('/api/comments/1000000')
            .expect(404);

        expect(res.body).toHaveProperty('message', 'Comment not found')
    });

    it('should return with a 403 error if comment author is not the current user', async () => {
        const { agent, user } = await createAgent();
        const newUser = await createUserOne();
        const newPost = await createPostOne(user.id);
        const newComment = await createCommentOne(newUser.id, newPost.id);
        const res = await agent
            .delete(`/api/comments/${newComment.id}`)
            .expect(403);

        expect(res.body).toHaveProperty('message', 'Access forbidden')
    });

    it('should return a 204 status if comment is deleted', async () => {
        const { agent, user } = await createAgent();
        const newPost = await createPostOne(user.id);
        const newComment = await createCommentOne(user.id, newPost.id);
        const res = await agent
            .delete(`/api/comments/${newComment.id}`)
            .expect(204);
    });
});