var Hapi = require('hapi');
var config = require('config');
var server = new Hapi.Server();
var saml = require('./config/plugins/saml')
var fs = require('fs');
var path = require('path');

// Set some server stuff
server.connection({
    port: config.get("httpSever.port")
});

// Setup the view engine
server.views({
    engines: {
        html: require('handlebars')
    },
    path: path.join(__dirname, 'public/templates'),
    partialsPath: path.join(__dirname, 'public/templates/partials')
});

// Serve static files (css and js)
server.route({
    method: 'GET',
    path: '/static/{param*}',
    handler: {
        directory: {
            path: 'public/static'
        }
    }
})

// Load the routes
var routes = require('./routes');
// Register the routes to the server
for (var i = 0; i < routes.length; i++) {
    console.log('Registered [' + routes[i].method + '] ' + routes[i].path);
    server.route(routes[i]);
}

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

module.exports = server;
