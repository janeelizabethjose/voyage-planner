var tripModel = require('../model/tripModel');
var paramValidator = require('../validators/paramValidator');

let tripController = {
    getTripInfo(req, res, next) {
        tripModel.getTripInfo(req.body).then(response => {
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