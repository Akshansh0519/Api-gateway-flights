const express = require('express');

const router = express.Router();

const { InfoController } = require('../../controllers');
const { UserController } = require('../../controllers');

const UserRoutes = require('./user-routes');

router.use('/user', UserRoutes);

router.get('/info',InfoController.info); 

module.exports = router;