const { query } = require('express-validator');

module.exports = {
    getAirPollutionRequest: [
        query('lat').isFloat({ min: -90, max: 90 }),
        query('lon').isFloat({ min: -180, max: 180 }),
    ]
}
