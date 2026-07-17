const { Router } = require('express');
const commentRouter = Router();
const commentController = require('../controllers/commentController');
const isAuthenticated = require('../middleware/isAuthenticated');
const validateId = require('../middleware/validateId');
const validatePostId = require('../middleware/validatePostId');
const validateComment = require('../middleware/validateComment');

commentRouter.get('/:id', isAuthenticated, validateId, commentController.getComment);
commentRouter.post('/:postId', isAuthenticated, validatePostId, validateComment, commentController.createComment);
commentRouter.put('/:id', isAuthenticated, validateId, validateComment, commentController.updateComment);
commentRouter.delete('/:id', isAuthenticated, validateId, commentController.deleteComment);

module.exports = commentRouter;