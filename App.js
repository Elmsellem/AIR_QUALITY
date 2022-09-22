const { SERVER_PORT } = require('./config');
const express = require('express');
const cron = require('node-cron');

const bodyParser = require('body-parser');
const routes = require('./routes/index');
const jobs = require('./cronJobs/jobs');

module.exports = class App {
    constructor() {
        this.expressApp = express();
        this.initMiddlewares();
        this.initRoutes();
        this.initCronJobs();
    }

    run() {
        this.expressApp.listen(SERVER_PORT, () => {
            console.log('Server started at port:', SERVER_PORT);
        })
    }

    initMiddlewares() {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: true }));
        this.expressApp.use(express.json());
    }

    initRoutes() {
        routes.map(route => this.useRoute(route));
    }

    /** @param {Route} route */
    useRoute(route) {
        typeof route.middleware === 'function' ?
            this.expressApp.use(route.prefix, route.middleware, route.router) :
            this.expressApp.use(route.prefix, route.router);
    }

    initCronJobs() {
        jobs.forEach(job => cron.schedule(job.expression, job.task));
    }
}
