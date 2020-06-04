var userModal= require('../model/userModal');
var paramValidator = require('../validators/paramValidator');

let userController = {
    createUser(req, res, next) {
        if (paramValidator.checkObject({
            email: req.body.email,
            password: req.body.password
        }) !== true) {
            return res.status(500).json({ error: paramValidator.errorMessage });
        }
        userModal.createUser(req.body).then(response => {
            var responseData = {
                "data": response
            }
            return res.status(200).json(responseData);
        }).catch(error => {
            return res.status(500).json(error);
        })
    },

    login(req, res, next) {
        if (paramValidator.checkObject({
            email: req.body.email,
            password: req.body.password
        }) !== true) {
            return res.status(500).json({ error: paramValidator.errorMessage });
        }
        userModal.login(req.body).then(response => {
            var responseData = {
                "data": response
            }
            return res.status(200).json(responseData);
        }).catch(error => {
            return res.status(500).json(error);
        })
    }
};
module.exports = userController;