var db = require('../db/dbConnection');

var userModal = {
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
                let insertstmt = `SELECT * FROM users WHERE email = ? AND password = ?`;
                let insertValue = [params.email,params.password];
                console.log(insertValue);
                db.query(insertstmt,insertValue, (error, rows) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(rows);
                    }
                });
            });
        } catch (e) {
            console.log(e);
        }
    }
};
module.exports = userModal;