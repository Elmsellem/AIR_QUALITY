const router = require('express').Router();
const { getAirPollution, getMostPollutedDatetime } = require('../controllers/pollutionController');
const { getAirPollutionRequest } = require('../midlewares/pollutionRequests');
const { validationResultMiddleware } = require('../midlewares/validationResultMiddleware');

router.get('/current', [getAirPollutionRequest, validationResultMiddleware], getAirPollution);

router.get('/most_polluted_datetime', getMostPollutedDatetime);

module.exports = router;
