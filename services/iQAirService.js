const iQAirAxios = require('./iQAirAxios');
const sqliteConnection = require('../database/sqliteConnection');

const iQAirService = {
    /**
     * 
     * @param {Number} lat
     * @param {Number} lon
     * @returns {Promise<{ts, aqius, mainus, aqicn, maincn}>}
     */
    async getIQAirPollutionByLatLng(lat, lon) {
        const params = { lat, lon };
        const response = await iQAirAxios.get('nearest_city', { params });
        if (response.data && response.data.status === "success") {
            return response.data.data.current.pollution;
        }
        throw new Error('API Error');
    },

    /**
     * 
     * @param {Number} lat
     * @param {Number} lon
     * @returns {Promise}
     */
    async saveIQAirPollution(lat, lon) {
        const poll = await iQAirService.getIQAirPollutionByLatLng(lat, lon);
        const createdAt = new Date().toISOString();

        const query = 'INSERT INTO pollutions (ts, aqius, mainus, aqicn, maincn, created_at) VALUES(?,?,?,?,?,?)';
        const value = [poll.ts, poll.aqius, poll.mainus, poll.aqicn, poll.maincn, createdAt];

        return new Promise((resolve, reject) => {
            sqliteConnection.run(query, value, function (err) {
                if (err) return reject(err);

                resolve();
            });
        })
    },

    /**
     * @returns {Promise<String>}
     */
     async getMostPollutedDatetime() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM pollutions ORDER BY aqius DESC LIMIT 1';
            sqliteConnection.get(query, function (err, row) {
                if (err) return reject(err);

                resolve(row?.created_at);
            });
        })
    }
}

module.exports = iQAirService;
