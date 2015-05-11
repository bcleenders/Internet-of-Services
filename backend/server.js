var Hapi = require('hapi');
var config = require('config');
var server = new Hapi.Server();
var saml = require('./config/plugins/saml')
var fs = require('fs');

// Set some server stuff
server.connection({
    port: config.get("httpSever.port")
});
// Load the routes
var routes = require('./routes');
// Register the routes to the server
for (var i = 0; i < routes.length; i++) {
    console.log('Registered [' + routes[i].method + '] ' + routes[i].path);
    server.route(routes[i]);
}
// Load the plugins
var pluginPath = "./config/plugins"
var files = fs.readdirSync(pluginPath);

for (var i = 0; i < files.length; i++) {
    console.log('Registered ' + files[i] + " plugin");
    var plugin = require(pluginPath + "/" + files[i])
    server.register(plugin, function (err) {
        if (err) {
            console.log('Failed loading ' + files[i] + ' plugin: ' + err.toString());
        }
    });
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
