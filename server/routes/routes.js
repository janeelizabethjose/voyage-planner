const express = require('express');
const router = express.Router();

var userController = require('../controller/userController');

router.post('/createUser', userController.createUser);
router.post('/login', userController.login);

module.exports = router;