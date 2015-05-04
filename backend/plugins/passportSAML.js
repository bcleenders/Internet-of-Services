var passport = require('passport');
var passportSAML = require('passport-saml');

var myPlugin = {
    register: function (server, options, next) {

        passport.initialize();

        var SamlStrategy = passportSAML.Strategy;

        passport.use('saml', new SamlStrategy({
                path: '/login/saml/callback',
                entryPoint: 'https://openidp.feide.no/simplesaml/saml2/idp/SSOService.php',
                issuer: 'passport-saml'
            },
            function (profile, done) {
                debugger;
                console.log('Profile: ');
                console.log(profile);
            })
        );

        /*
         Define a custom authentication strategy.
         This authenticates with SAML and gives a token on successful login.
         */
        var scheme = function (server, options) {
            return {
                authenticate: function(request, reply, opts) {
                    passport.authenticate('saml')({
                        query: request.query,
                        body: request.body || request.payload,
                        session: request.session
                    }, reply, next);
                }
            };
        };

        server.auth.scheme('samlScheme', scheme);
        server.auth.strategy('saml', 'samlScheme');

        console.log('Registering /login/saml');

        server.route({
            method: 'GET',
            // The callback endpoint registered with the provider
            path: '/login/saml',
            config: {
                auth: 'saml',
                handler: function (req, reply) {
                    debugger;
                    // Give user a token
                    reply('TOKEN!');
                }
            }
        });

        next();
    }
};

myPlugin.register.attributes = {
    name: 'myPlugin',
    version: '1.0.0'
};

module.exports = myPlugin;
