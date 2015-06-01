var Boom = require('boom');
var Promise = require('bluebird');

var handle = function (req, reply) {
    // TODO: verify signature!

    var models = req.server.plugins.models;

    var courseData = {
        id: req.payload.context_id,
        name: req.payload.context_title
    };

    //        teacher: (req.payload.roles === 'Instructor')


    var userData = {
        name: req.payload.lis_person_name_full,
        email: req.payload.lis_person_contact_email_primary
    };

    models._bookshelf.transaction(function(t) {
        // Save user to database
        return new models.user(userData).save(null, {transacting: t});

    }).then(function(u) {
        console.log(u);
        reply('Hello ' + userData.name + '!');

    }).catch(function(err) {
        console.error(err);
    });
};

module.exports = {
    handle: handle
};