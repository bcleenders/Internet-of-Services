var Hapi = require('hapi');
var config = require('config');
var server = new Hapi.Server();
var saml = require('./config/plugins/saml')
var fs = require('fs');

// Set some server stuff
server.connection({
    port: config.get("httpServer.port")
});

// Load the plugins
var plugins = require('./config/plugins');
for(var name in plugins) {
    console.log('Registered ' + name + " plugin");
    server.register(plugins[name], function (err) {
        if (err) {
            console.log('Failed loading ' + name + ' plugin: ' + err.toString());
        }
    });
}

// Load the routes
var routes = require('./routes');
// Register the routes to the server
for (var i = 0; i < routes.length; i++) {
    server.route(routes[i]);
    console.log('Registered [' + routes[i].method + '] ' + routes[i].path);
}

module.exports = server;
