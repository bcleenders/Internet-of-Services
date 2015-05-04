/*
Authentication using passport-saml, see:
 https://github.com/bergie/passport-saml

Since Passport is not compatible with Hapi, it needs an adapter:
 https://github.com/ikkyotech/hapi-passport
 */

var SamlStrategy = require('passport-saml').Strategy;
var samlLogin = require("hapi-passport")(new SamlStrategy(
    {
        path: '/login/callback',
        entryPoint: 'https://openidp.feide.no/simplesaml/saml2/idp/SSOService.php',
        issuer: 'passport-saml'
    },
    function(profile, done) {
        findByEmail(profile.email, function(err, user) {
            if (err) {
                return done(err);
            }
            return done(null, user);
        });
    })
);

console.log('samlLogin: ' + samlLogin({}));

//new SamlStrategy({
//    path: '/login/saml/callback',
//    entryPoint: 'https://openidp.feide.no/simplesaml/saml2/idp/SSOService.php',
//    issuer: 'passport-saml'
//}, function(profile, done) {
//    console.log(profile);
//    console.log('Made it this far!');
//
//    return done(null, profile);
//
//    //findByEmail(profile.email, function(err, user) {
//    //    if (err) {
//    //        return done(err);
//    //    }
//    //    return done(null, user);
//    //});
//}));

module.exports = samlLogin({});

//    {
//    onSuccess: function (info, request, reply) {
//        // maybe do a redirect?
//        console.log('Login success');
//        reply('OK');
//    },
//    onFailed: function (warning, request, reply) {
//        // maybe show an error?
//        console.log('Login failed');
//        reply('FAIL');
//    },
//    onError: function (error, request, reply) {
//        // tell the world that you are angry.
//        console.log('Login error');
//        reply('ERROR');
//    }
//});