var Boom = require('boom');
var Promise = require('bluebird');
var _ = require('lodash');

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

    var upsert = function(model, data) {
        model.fetch()
    };

    Promise.join([
        new models.user().where({email: userData.email}).fetch({required: true}).then(function(user) {
                if(user === null) {
                    return new models.user(userData).save();
                } else {
                    return user;
                }
            }),
        new models.course().where({isis_id: courseData.isis_id}).fetch({required: true}).then(function(course) {
                if(course === null) {
                    return new models.course(courseData).save();
                } else {
                    return course;
                }
            })
    ]).then(function(result) {

        //result[0][0].get('name').then(function(name) {
        //    console.log("Received user: " + name);
        //});

        reply('Hello, world!');
    });
};

module.exports = {
    handle: handle
};