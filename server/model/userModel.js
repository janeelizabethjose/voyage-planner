var db = require('../db/dbConnection');

var userModel = {
    createUser: function (params) {
        try {
            return new Promise((resolve, reject) => {
                let insertstmt = `INSERT INTO users(email,password) VALUES(?,?)`;
                let insertValue = [params.email,params.password];
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
    },

    login: function (params) {
        try {
            return new Promise((resolve, reject) => {
                let selectStatement = `SELECT id, email FROM users WHERE email = ? AND password = ?`;
                let selectValue = [params.email,params.password];
                db.query(selectStatement,selectValue, (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(rows[0]);
                    }
                });
            });
        } catch (e) {
            console.log(e);
        }
    }
};
module.exports = userModel;