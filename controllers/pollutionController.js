const iQAirService = require('../services/iQAirService');

module.exports = {
    getAirPollution: (req, res) => {
        iQAirService.getIQAirPollutionByLatLng(req.query.lat, req.query.lon)
            .then(pollution => res.json({ result: { pollution } }))
            .catch(error => res.status(500).json('Someting went wrong!'));
    },

    getMostPollutedDatetime: (req, res) => {
        iQAirService.getMostPollutedDatetime()
            .then(datetime => res.json({ result: { datetime } }))
            .catch(error => res.status(500).json('Someting went wrong!'));
    }
}