'use strict'
let services

module.exports = function (serv) {
    services=serv;
    return module.exports
}
/**
    * @module cota-web-api - This module contains the Router of the paths used in a RESTfull api
    * @var {Router}  - The Router object with the array of routes and methods to add and check routes.
   */

module.exports.Router;
var Router = {
    routes: [],
    mode: null,
    root: '/',
    add: function (path, func) {
        if (typeof path == 'function') {
            func = path;
            path = '';
        }
        this.routes.push({ path: path, func: func });
        return this;
    },
    remove: function (param) {
        for (var i = 0, r; i < this.routes.length, r = this.routes[i]; i++) {
            if (r.handler === param || r.path.toString() === param.toString()) {
                this.routes.splice(i, 1);
                return this;
            }
        }
        return this;
    },
    checkRoute: function (param) {
        param = param.replace(/\d+/g, "(.*)");
        for (var i = 0, r; i < this.routes.length, r = this.routes[i]; i++) {
            r.path = r.path.toString().replace(/\/$/, '').replace(/^\//, '');
            if (r.handler === param || r.path.toString() === param.toString()) {
                return this.routes[i];
            }
        }
        return null;
    }
}

/**
    * @method addRoutes - this method adds the Routes to the Router 
    * and adds the funcions associated with each command
    * and each callback.
    */
module.exports.addRoutes = function () {
    Router
        .add('/GET/tvshows/', function (ids, params, callback) {
            //return callback({"statusCode": 200, "body": "test"});
            services.getTvShows(params, callback)
        })
        .add('/GET/tvshow/', function (ids, params, callback) {
            //return callback({"statusCode": 200, "body": "test1"});
            services.getTvShow(params, callback);
        })
        .add('/POST/groups/', function (ids, params, callback) {
            //return callback({"statusCode": 200, "body": "test3"});
            services.postGroup(params, callback)
        })
        .add('/PUT/groups/(.*)/', function (ids, params, callback) {
            //return callback({"statusCode": 200, "body": "test4"});
            services.putGroups(ids, params, callback);
        })
        .add('/GET/groups/', function (ids, params, callback) {
            //return callback({"statusCode": 200, "body": "test5"});
            services.getGroups(params, callback)
        })
        .add('/GET/group/(.*)/', function (ids, params, callback) {
            //return callback({"statusCode": 200, "body": "test6"});
            services.getGroupByID(ids, callback)
        })
        .add('/POST/groups/(.*)/tvshow/', function (ids, params, callback) {
            //return callback({"statusCode": 200, "body": "test8"});
            services.postTvShowsInGroup(ids, params, callback)
        })
        .add('/DELETE/groups/(.*)/tvshow/(.*)/', function (ids, params, callback) {
            //return callback({ "statusCode": 200, "body": "test9" });
            services.deleteTvShowsByID(ids, callback)
        })
        .add('/GET/groups/(.*)/tvshows/', function (ids, params, callback) {
            //return callback({ "statusCode": 200, "body": "test9" });
            services.getGroupsTvShows(ids,params, callback)
        });
}


/**
    * @method checkRoutes - aux function that connects server with router .
    */
module.exports.checkRoutes = function (method, path) {
    return Router.checkRoute(method + path);
}


/**
    * @method checkRoutes - aux function to call the execute() of the commands.
    */
module.exports.execute = function (ids, cmd, params, callback) {
    return cmd.func(ids, params, callback);
}

/**
    * @method checkRoutes - aux function to add a single route.
    */
module.exports.addSingleRoute = function (path, fun) {
    Router.add(path, fun);
}


