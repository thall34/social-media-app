const { Router } = require('express');
const postRouter = Router();
const postController = require('../controllers/postController');
const isAuthenticated = require('../middleware/isAuthenticated');
const validateId = require('../middleware/validateId');
const validateUserId = require('../middleware/validateUserId');
const validatePost = require('../middleware/validatePost');

postRouter.get('/all', isAuthenticated, postController.getAllPostsForUser);
postRouter.get('/peer/:id', isAuthenticated, validateId, postController.getPostsForPeer);
postRouter.get('/:id', isAuthenticated, validateId, postController.getPost);
postRouter.post('/', isAuthenticated, validatePost, postController.createPost);
postRouter.post('/likes/:id', isAuthenticated, validateId, postController.addLikeToPost);
postRouter.put('/:id', isAuthenticated, validateId, validatePost, postController.updatePost);
postRouter.delete('/:id', isAuthenticated, validateId, postController.deletePost);
postRouter.delete('/likes/:id', isAuthenticated, validateId, postController.removeLikeFromPost);

module.exports = postRouter;