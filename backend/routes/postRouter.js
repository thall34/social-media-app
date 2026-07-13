const { Router } = require('express');
const postRouter = Router();
const postController = require('../controllers/postController');
const isAuthenticated = require('../middleware/isAuthenticated');
const validateId = require('../middleware/validateId');
const validateUserId = require('../middleware/validateUserId');
const validatePost = require('../middleware/validatePost');

postRouter.get('/all/:userId', isAuthenticated, validateUserId, postController.getAllPostsForUser);
postRouter.get('/likes/:id', isAuthenticated, validateId, postController.getLikesForPost);
postRouter.get('/:id', isAuthenticated, validateId, postController.getPost);
postRouter.post('/:userId', isAuthenticated, validateUserId, validatePost, postController.createPost);
postRouter.post('/likes/:id/:userId', isAuthenticated, validateId, validateUserId, postController.addLikeToPost);
postRouter.put('/:id/:userId', isAuthenticated, validateId, validateUserId, validatePost, postController.updatePost);
postRouter.delete('/:id/:userId', isAuthenticated, validateId, validateUserId, postController.deletePost);
postRouter.delete('/likes/:id/:userId', isAuthenticated, validateId, validateUserId, postController.removeLikeFromPost);

module.exports = postRouter;