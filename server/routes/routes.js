const express = require('express');
const router = express.Router();

var userController = require('../controller/userController');
var tripController = require('../controller/tripController');

router.post('/createUser', userController.createUser);
router.post('/login', userController.login);
router.post('/getTripInfo', tripController.getTripInfo);

module.exports = router;