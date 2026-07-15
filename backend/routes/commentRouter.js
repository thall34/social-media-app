const { Router } = require('express');
const commentRouter = Router();
const commentController = require('../controllers/commentController');
const isAuthenticated = require('../middleware/isAuthenticated');
const validateId = require('../middleware/validateId');
const validateUserId = require('../middleware/validateUserId');
const validatePostId = require('../middleware/validatePostId');
const validateComment = require('../middleware/validateComment');

commentRouter.get('/:id', isAuthenticated, validateId, commentController.getComment);
commentRouter.post('/:userId/:postId', isAuthenticated, validateUserId, validatePostId, validateComment, commentController.createComment);
commentRouter.put('/:id/:userId', isAuthenticated, validateId, validateUserId, validateComment, commentController.updateComment);
commentRouter.delete('/:id/:userId', isAuthenticated, validateId, validateUserId, commentController.deleteComment);

module.exports = commentRouter;