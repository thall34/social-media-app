const { Router } = require('express');
const userRouter = Router();
const userController = require('../controllers/userController');
const isAuthenticated = require('../middleware/isAuthenticated');
const validateId = require('../middleware/validateId');
const validateUser = require('../middleware/validateUser');
const validateLogin = require('../middleware/validateLogin');
const validateUpdateUser = require('../middleware/validateUpdateUser');
const uploadProfilePic = require('../middleware/multer');

userRouter.get('/me', userController.sendUserDetails);
userRouter.get('/pool', isAuthenticated, userController.getPeerPool);
userRouter.get('/peer/:id', isAuthenticated, validateId, userController.findUser);
userRouter.get('/peer/:id/pool', isAuthenticated, validateId, userController.getPeerPoolForPeer);
userRouter.post('/', uploadProfilePic, validateUser, userController.createUser);
userRouter.post('/login', validateLogin, userController.logInUser);
userRouter.post('/logout', userController.logOutUser);
userRouter.post('/follow-request/:id', isAuthenticated, validateId, userController.addFollowRequestToUser);
userRouter.post('/follow/:id', isAuthenticated, validateId, userController.addFollowerAndRemoveRequestFromUser);
userRouter.put('/picture', isAuthenticated, uploadProfilePic, userController.updateUserProfilePic);
userRouter.put('/', isAuthenticated, validateUpdateUser, userController.updateUser);
userRouter.delete('/follow-request/cancel/:id', isAuthenticated, validateId, userController.removeFollowRequestFromUser);
userRouter.delete('/follow-request/decline/:id', isAuthenticated, validateId, userController.declineFollowRequestFromUser);
userRouter.delete('/follow/:id', isAuthenticated, validateId, userController.removeFollower);
userRouter.delete('/', isAuthenticated, userController.deleteUser);

module.exports = userRouter; 