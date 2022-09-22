const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = process.env.JEST_WORKER_ID === undefined ?
    path.resolve(__dirname, './../data/pollution.db') :
    ':memory:';

const sqliteConnection = new sqlite3.Database(dbPath);

module.exports = sqliteConnection;
