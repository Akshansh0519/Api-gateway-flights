const express = require('express');
const router = express.Router();
const { UserController } = require('../../controllers');

router.post('/', UserController.createUser);

module.exports = router;