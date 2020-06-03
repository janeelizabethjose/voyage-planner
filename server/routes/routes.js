const express = require('express');
const router = express.Router();

var userController = require('../controller/userController');

router.post('/createUser', userController.createUser);

module.exports = router;