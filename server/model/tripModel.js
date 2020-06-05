var db = require('../db/dbConnection');

var tripModel = {
    getTripInfo: function (params) {
        try {
            return new Promise((resolve, reject) => {
                let selectStatement = `SELECT * FROM trips WHERE user_id = ?`;
                let selectValue = [params.userID];
                db.query(selectStatement,selectValue, (error, rows) => {
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
module.exports = tripModel;