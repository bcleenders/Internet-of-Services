var Boom = require('boom');

var handle = function (req, reply) {
    // TODO: verify signature!

    var course = req.payload.context_id;

    var user = {
        name: req.payload.lis_person_name_full,
        email: req.payload.lis_person_contact_email_primary,
        teacher: (req.payload.roles === 'Instructor')
    };
    
    new req.server.plugins.models.user(user).save().then(function(model) {
        console.log('Saved user to database!');

        reply('Hello, ' + model.name + '!');
    });
};

module.exports = {
    handle: handle
};