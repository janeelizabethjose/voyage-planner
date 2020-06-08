const express = require('express');
const router = express.Router();

var userController = require('../controller/userController');
var tripController = require('../controller/tripController');

router.post('/createUser', userController.createUser);
router.post('/login', userController.login);
router.get('/getTripInfo?', tripController.getTripInfo);
router.get('/getTripDayInfo?', tripController.getTripDayInfo);
router.post('/createTrip', tripController.createTrip);
router.post('/createTripDay', tripController.createTripDay);
router.get('/getTripDayEventInfo?', tripController.getTripDayEventInfo);
router.post('/createTripDayEvent', tripController.createTripDayEvent);
router.delete('/deleteTripPlan/:Id', tripController.deleteTripPlan);

module.exports = router;