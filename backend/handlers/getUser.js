var Boom = require('boom');

var handle = function (req, reply) {
    var server = req.server;
    var User = server.plugins.models.user;

    User.where({id: 5})
        .fetch()
        .then(function(user) {
            console.log('got this user:');
            console.log(user);

            reply();
        });
};

module.exports = {
    handle: handle
};
