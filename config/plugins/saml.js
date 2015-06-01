var SamlAuth = require('hapi-auth-saml');
var config = require('config');

exports.register = function (server, options, next) {

  var options = config.get("saml");

  options.verifyFunc = function(profile, done) {
    // Implement Callback once authenticated
    // The object returned in the done function will be displayed in the result
    return done(null, {email: profile.email, username: profile.uid});
  }

  server.register({register: SamlAuth, options: options}, function (err) {
    if (err) {
      server.log('Failed loading SAML-HAPI plugin: ' + err.toString());
    }
    server.auth.strategy('samlAuth', 'saml', options);

    server.route({
      method: 'GET',
      path: '/login',
      config: {
        auth: 'samlAuth',
        handler: function(request, reply) {
          reply(request.auth);
        }
      }
    });
  });

  next();
};

exports.register.attributes = {
    name: 'IOSSamlAuth',
    version: '0.0.1'
};
