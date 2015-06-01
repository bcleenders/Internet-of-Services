var Boom = require('boom');
var Promise = require('bluebird');

var handle = function (req, reply) {
    // TODO: verify signature!

    var models = req.server.plugins.models;

    var courseData = {
        isis_id: req.payload.context_id,
        name: req.payload.context_title,
        year: 2000,
        semester: 'SS'
    };

    var userData = {
        name: req.payload.lis_person_name_full,
        email: req.payload.lis_person_contact_email_primary
    };

    var course_userData = {
        teacher: (req.payload.roles === 'Instructor')
    };

    Promise.join([
        new models.user(userData).save(),
        new models.course(courseData).save()
    ]).then(function (u, c) {
        console.log(u);

        debugger;

        reply('Hello ' + userData.name + '!');

    }).catch(function (err) {
        console.error(err);
    });
};

module.exports = {
    handle: handle
};