const axios = require('axios');
const { IQAIR_URL, IQAIR_KEY } = require('../config');

const iQAirAxios = axios.create({
    baseURL: IQAIR_URL,
    timeout: 3000,
});

iQAirAxios.defaults.params = {
    key: IQAIR_KEY,
}

module.exports = iQAirAxios;
