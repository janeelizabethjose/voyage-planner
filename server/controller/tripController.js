var tripModel = require('../model/tripModel');
var paramValidator = require('../validators/paramValidator');

let tripController = {
    getTripInfo(req, res) {
        if (paramValidator.checkObject({
            userID: req.query.userID
        }) !== true) {
            return res.status(500).json({ error: paramValidator.errorMessage });
        }
        tripModel.getTripInfo(req.query).then(response => {
            var responseData = {
                "rows": response
            }
            return res.status(200).json(responseData);
        }).catch(error => {
            return res.status(500).json(error);
        })
    },
    getTripDayInfo(req, res) {
        if (paramValidator.checkObject({
            tripID: req.query.tripID,
            userID: req.query.userID
        }) !== true) {
            return res.status(500).json({ error: paramValidator.errorMessage });
        }
        tripModel.getTripDayInfo(req.query).then(response => {
            var responseData = {
                "rows": response
            }
            return res.status(200).json(responseData);
        }).catch(error => {
            return res.status(500).json(error);
        })
    },
    createTrip(req, res, next) {
        tripModel.createTrip(req.body).then(response => {
            var responseData = {
                "rows": response
            }
            return res.status(200).json(responseData);
        }).catch(error => {
            return res.status(500).json(error);
        })
    },
    createTripDay(req, res, next) {
        tripModel.createTripDay(req.body).then(response => {
            var responseData = {
                "rows": response
            }
            return res.status(200).json(responseData);
        }).catch(error => {
            return res.status(500).json(error);
        })
    },
    getTripDayEventInfo(req, res) {
        if (paramValidator.checkObject({
            tripDayID: req.query.tripDayID,
            userID: req.query.userID
        }) !== true) {
            return res.status(500).json({ error: paramValidator.errorMessage });
        }
        tripModel.getTripDayEventInfo(req.query).then(response => {
            var responseData = {
                "rows": response
            }
            return res.status(200).json(responseData);
        }).catch(error => {
            return res.status(500).json(error);
        })
    },
    createTripDayEvent(req, res, next) {
        if (paramValidator.checkObject({
            tripDayID: req.body.tripDayID,
            userID: req.body.userID,
            categoryID: req.body.categoryID,
            title: req.body.title,
        }) !== true) {
            return res.status(500).json({ error: paramValidator.errorMessage });
        }
        tripModel.createTripDayEvent(req.body).then(response => {
            var responseData = {
                "rows": response
            }
            return res.status(200).json(responseData);
        }).catch(error => {
            return res.status(500).json(error);
        })
    },
    createTripDayEvent(req, res, next) {
        if (paramValidator.checkObject({
            tripDayID: req.body.tripDayID,
            userID: req.body.userID,
            categoryID: req.body.categoryID,
            title: req.body.title,
        }) !== true) {
            return res.status(500).json({ error: paramValidator.errorMessage });
        }
        tripModel.createTripDayEvent(req.body).then(response => {
            var responseData = {
                "rows": response
            }
            return res.status(200).json(responseData);
        }).catch(error => {
            return res.status(500).json(error);
        })
    },
    deleteTripPlan(req, res, next) {
        if (parseInt(req.params.Id) < 1) {
            return res.status(500).json({ error: "Invalid Input!" });
        }
        tripModel.deleteTripPlan(req.params.Id).then(response => {
            var responseData = {
                "rows": response
            }
            return res.status(200).json(responseData);
        }).catch(error => {
            return res.status(500).json(error);
        })
    }
};
module.exports = tripController;