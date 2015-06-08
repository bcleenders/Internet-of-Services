var crypto = require('crypto');
var config = require('config').get('cookieAuth');

exports.register = function (server, options, next) {

    if(config.secret == '') {
        console.log('WARNING: running with empty secret! Set cookieAuth.secret in config to random string!');
    }

    server.register(require('hapi-auth-cookie'), function (err) {
        server.auth.strategy('session', 'cookie', {
            password: config.secret,
            cookie: config.name,
            // If the user is not logged in, redirect him to the login page
            redirectTo: '/login',
            isSecure: false
        });

        // Set this to be the default way of logging in.
        server.auth.default('session');

        server.auth.currentUser = function(){
            console.log("Im fucked")
        }
    });

    next();
};

exports.register.attributes = {
    name: 'IOSCookieAuth',
    version: '0.0.1'
};