const sqliteConnection = require('./sqliteConnection');

const pollutionTable = `
CREATE TABLE pollutions (
    id INTEGER PRIMARY KEY,
    ts DATETIME,
    aqius INTEGER,
    mainus TEXT,
    aqicn INTEGER,
    maincn TEXT,
    created_at DATETIME
)
`;

sqliteConnection.run(pollutionTable, err => {
    if (err) {
        return console.log(err);
    }

    console.log('Sqlite database was successfully initialized');
});
