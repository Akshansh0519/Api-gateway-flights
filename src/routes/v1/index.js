const express = require('express');

const router = express.Router();

const { InfoController } = require('../../controllers');
const { UserController } = require('../../controllers');
const { AuthMiddleware } = require('../../middlewares');

const UserRoutes = require('./user-routes');

router.use('/user', UserRoutes);

router.get('/info',AuthMiddleware.checkAuthentication, InfoController.info); 

module.exports = router;