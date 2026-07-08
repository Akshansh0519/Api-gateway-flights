const express = require('express');
const router = express.Router();
const { UserController } = require('../../controllers');
const { AuthMiddleware } = require('../../middlewares');

router.post('/signup', AuthMiddleware.validateAuthRequest, UserController.createUser);
router.post('/signin', AuthMiddleware.validateAuthRequest, UserController.signIn);
//when you use the x-access-token of an ADMIN, then only you can make someone else as an ADMIN, else unauthorized
router.post('/role', AuthMiddleware.checkAuthentication, AuthMiddleware.isAdmin, UserController.AddRoleToUser);

module.exports = router;