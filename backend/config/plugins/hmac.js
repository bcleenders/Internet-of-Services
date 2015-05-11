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

        server.route({
            method: 'GET',
            path: '/logout',
            config: {
                auth: false,
                handler: function(request, reply) {
                    request.auth.session.clear();
                    return reply.redirect('/');
                }
            }
        });

        // Set this to be the default way of logging in.
        server.auth.default('session');
    });

    next();
};

exports.register.attributes = {
    name: 'IOSCookieAuth',
    version: '0.0.1'
};