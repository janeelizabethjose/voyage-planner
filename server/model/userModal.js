var db = require('../db/dbConnection');

var userModal = {
    createUser: function (params) {
        try {
            return new Promise((resolve, reject) => {
                let insertstmt = `INSERT INTO user(email,password,username) VALUES(?,?,?)`;
                let insertValue = [params.email,params.password,params.username];
                db.query(insertstmt,insertValue, (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(rows.insertId);
                    }
                });
            });
        } catch (e) {
            console.log(e);
        }
    }
};
module.exports = userModal;