require('dotenv').config()

module.exports = {
    SERVER_PORT: process.env.SERVER_PORT ?? 3000,
    
    IQAIR_URL: process.env.IQAIR_URL ?? 'https://api.airvisual.com/v2',
    IQAIR_KEY: process.env.IQAIR_KEY ?? '',
};
