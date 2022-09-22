const sqliteConnection = require('../database/sqliteConnection');
const { saveIQAirPollution } = require('../services/iQAirService');

module.exports = {
    expression: '* * * * *',

    async task() {
        const lat = 48.856613;
        const lng = 2.352222;

        saveIQAirPollution(lat, lng)
            .then(() => console.log('pollutionJob: pollution saved'))
            .catch(err => console.log('pollutionJob: error:', err?.response?.statusText));
    }
};
