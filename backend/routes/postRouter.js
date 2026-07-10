const { Router } = require('express');
const postRouter = Router();
const postController = require('../controllers/postController');
const isAuthenticated = require('../middleware/isAuthenticated');
const validateId = require('../middleware/validateId');
const validateUserId = require('../middleware/validateUserId');
const validatePost = require('../middleware/validatePost');

postRouter.get('/:id', isAuthenticated, validateId, postController.getPostById);
postRouter.post('/:userId', isAuthenticated, validateUserId, validatePost, postController.createPost);
postRouter.put('/:id/:userId', isAuthenticated, validateId, validateUserId, validatePost, postController.updatePost);
postRouter.delete('/:id/:userId', isAuthenticated, validateId, validateUserId, postController.deletePost);

module.exports = postRouter;