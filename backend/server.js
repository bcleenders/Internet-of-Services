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


//server.register(require('./plugins/passportSAML'), function (err) {
//    if (err) {
//        console.log('Failed loading HapiMongoModels plugin: ' + err.toString());
//    }
//});
var samlStrat = require("passport-saml").Strategy,
    samlLogin = require("hapi-passport")(new samlStrat({
            path: '/login/callback',
            entryPoint: 'https://openidp.feide.no/simplesaml/saml2/idp/SSOService.php',
            issuer: 'passport-saml'
        },
        function (profile, done) {
            debugger;
            console.log('Profile: ');
            console.log(profile);

            done(null, {name: 'John'});
        })
    );

// Beware: only works if you set
//  callbackUrl = 'http://localhost:3000/login/saml';
// in passport-saml/strategy.js

server.route({
    method: '*',
    path: "/login/callback",
    handler: samlLogin({
        onSuccess: function (info, request, reply) {
            // maybe do a redirect?
            reply('DONE');
        },
        onFailed: function (warning, request, reply) {
            // maybe show an error?
            reply('DONE2');
        },
        onError: function (error, request, reply) {
            // tell the world that you are angry.
            debugger;
            console.log(error);
            console.log(error.stack);
            reply('DONE3');
        }
    })
});

server.route({
    method: "GET", path: "/login/saml/callback",
    handler: function(req, reply) {
        reply('You got redirected!');
    }
});

module.exports = server;
