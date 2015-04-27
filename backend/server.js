var Hapi = require('hapi');
//var _ = require('lodash');

var server = new Hapi.Server();
server.connection({port: 3000});

var routes = require('./routes');

for (var i = 0; i < routes.length; i++) {
    server.route(routes[i]);
}

module.exports = server;
