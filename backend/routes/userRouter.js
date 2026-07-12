const { Router } = require('express');
const userRouter = Router();
const userController = require('../controllers/userController');
const isAuthenticated = require('../middleware/isAuthenticated');
const isOwner = require('../middleware/isOwner');
const validateId = require('../middleware/validateId');
const validateUserId = require('../middleware/validateUserId');
const validateUser = require('../middleware/validateUser');
const validateLogin = require('../middleware/validateLogin');
const validateUpdateUser = require('../middleware/validateUpdateUser');

userRouter.get('/me', userController.sendUserDetails);
userRouter.get('/:id/pool', isAuthenticated, validateId, userController.getPeerPool);
userRouter.get('/:id', isAuthenticated, validateId, userController.findUser);
userRouter.post('/', validateUser, userController.createUser);
userRouter.put('/:id', isAuthenticated, validateId, isOwner, validateUpdateUser, userController.updateUser);
userRouter.delete('/follow/:userId/:id', isAuthenticated, validateUserId, validateId, userController.removeFollower);
userRouter.delete('/:id', isAuthenticated, validateId, isOwner, userController.deleteUser);
userRouter.post('/login', validateLogin, userController.logInUser);
userRouter.post('/logout', userController.logOutUser);
userRouter.post('/follow-request/:userId/:id', isAuthenticated, validateUserId, validateId, userController.addFollowRequestToUser);
userRouter.post('/follow/:userId/:id', isAuthenticated, validateUserId, validateId, userController.addFollowerAndRemoveRequest);

module.exports = userRouter;