const db = require('mysql');
const config = require('./config');

class Database {
    constructor() {
        this.conn = db.createConnection(
            {host            : 'localhost',
             database        : 'buhl',
             user            : 'mitarbeiter',
             password        : '!123456!',
             port            : '3306'}
        );
    }


    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.conn.query(sql, args, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.conn.end(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
}

module.exports = Database;
