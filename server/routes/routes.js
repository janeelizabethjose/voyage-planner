const express = require('express');
const router = express.Router();

var userController = require('../controller/userController');
var tripController = require('../controller/tripController');

router.post('/createUser', userController.createUser);
router.post('/login', userController.login);
router.post('/getTripInfo', tripController.getTripInfo);
router.post('/getTripDayInfo', tripController.getTripDayInfo);
router.post('/createTrip', tripController.createTrip);
router.post('/createTripDay', tripController.createTripDay);
router.post('/getTripDayEventInfo', tripController.getTripDayEventInfo);
router.post('/createTripDayEvent', tripController.createTripDayEvent);

module.exports = router;