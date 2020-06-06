var db = require('../db/dbConnection');

var tripModel = {
    getTripInfo: function (params) {
        try {
            return new Promise((resolve, reject) => {
                let selectStatement = `SELECT * FROM trips WHERE user_id = ?`;
                let selectValue = [params.userID];
                db.query(selectStatement, selectValue, (error, rows) => {
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
    },
    getTripDayInfo: function (params) {
        try {
            return new Promise((resolve, reject) => {
                let selectStatement = `SELECT id, name, trip_date, trip_id  FROM trip_days WHERE trip_id = ? AND user_id = ?`;
                let selectValue = [params.tripID, params.userID];
                db.query(selectStatement, selectValue, (error, rows) => {
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
    },
    createTrip: function (params) {
        try {
            return new Promise((resolve, reject) => {
                let insertstmt = `INSERT INTO trips(name,destination,start_date,end_date,user_id) VALUES(?,?,?,?,?)`;
                let insertValue = [params.name, params.destination, params.startDate, params.endDate, params.userID];
                db.query(insertstmt, insertValue, (error, rows) => {
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
    createTripDay: function (params) {
        try {
            return new Promise((resolve, reject) => {
                let insertstmt = `INSERT INTO trip_days(name,trip_date,user_id,trip_id) VALUES(?,?,?,?)`;
                let insertValue = [params.name, params.tripDate, params.userID, params.tripID];
                db.query(insertstmt, insertValue, (error, rows) => {
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
    getTripDayEventInfo: function (params) {
        try {
            return new Promise((resolve, reject) => {
                let selectStatement = `SELECT e.id, e.trip_day_id, e.category_id, e.currency_id, e.start_time, e.end_time, e.title, e.start_location, e.end_location, e.note, e.tag, e.cost, c.code currency_code, c.name currency_name
                                    FROM events e JOIN currencies c ON e.currency_id = c.id 
                                    WHERE trip_day_id = ? AND user_id = ? order by start_time asc`;
                let selectValue = [params.tripDayID, params.userID];
                db.query(selectStatement, selectValue, (error, rows) => {
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
    },
};
module.exports = tripModel;