module.exports = class Route {
    constructor(prefix, router, middleware) {
        this.prefix = prefix;
        this.router = router;
        this.middleware = middleware;
    }
}
