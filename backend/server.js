var Hapi = require('hapi');
var HapiMongoModels = require('hapi-mongo-models');
var config = require('config');
var server = new Hapi.Server();

// Load all models
var plugin = {
    register: HapiMongoModels,
    options: {
        mongodb: {
            url: "mongodb://" + config.get("dbConfig.host") + ":" + config.get("dbConfig.port") + "/" + config.get("dbConfig.dbName"),
            options: {}
        },
        autoIndex: false,
        models: {
            Quote: './models/quote'
        }
    }
};

server.register(plugin, function (err) {
    if (err) {
        console.log('Failed loading HapiMongoModels plugin: ' + err.toString());
    }
});

// Set some server stuff
server.connection({
    port: 3000
});

// Load the routes
var routes = require('./routes');
// Register the routes to the server
for (var i = 0; i < routes.length; i++) {
    console.log('Registered [' + routes[i].method + '] ' + routes[i].path);
    server.route(routes[i]);
}


server.register(require('./plugins/passportSAML'), function (err) {
    if (err) {
        console.log('Failed loading HapiMongoModels plugin: ' + err.toString());
    }
});

module.exports = server;
