const Route = require('./Route');
const apiRoutes = require('./api');

module.exports = [
    new Route('/pollution', apiRoutes),
];
