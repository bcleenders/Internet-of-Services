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
var pluginPath = "./config/plugins";
var files = fs.readdirSync(pluginPath);

for (var i = 0; i < files.length; i++) {
    console.log('Registered ' + files[i] + " plugin");
    var plugin = require(pluginPath + "/" + files[i]);
    server.register(plugin, function (err) {
        if (err) {
            console.log('Failed loading ' + files[i] + ' plugin: ' + err.toString());
        }
    });
}

// Load the routes
var routes = require('./routes');
// Register the routes to the server
for (var i = 0; i < routes.length; i++) {
    console.log('Registered [' + routes[i].method + '] ' + routes[i].path);
    server.route(routes[i]);
}

module.exports = server;
