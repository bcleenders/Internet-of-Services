var Boom = require('boom');
var Promise = require('bluebird');
var moment = require('moment');

var handle = function (req, reply) {
    var user = req.auth.credentials;
    var models = req.server.plugins.models;

    new models.user({id: user.id}).fetch({withRelated: ['supervisorCourses']}).then(function(user) {
        var course = user.related("supervisorCourses").get(req.params.course_id);

        // Check that the user is allowed to edit this course:
        if(course) {

            // So now we know the user is allowed to update the course:
            courseData = {
                name: req.payload.name,
                year: JSON.parse(req.payload.year),
                semester: req.payload.semester,
                description: req.payload.description
            };

            return course.save(courseData, {patch: true});
        } else {
            reply(Boom.unauthorized('You are not allowed to visit this page.'));
        }
    }).then(function(course) {
        // Course is updated
        reply.view('course_properties_form', {
            course: {
                id: course.get('id'),
                name: course.get('name'),
                semester: course.get('semester'),
                year: course.get('year')
            }, supervisor: {
                name: 'Bram :)'
            }, debuginfo: {
                payload: JSON.stringify(req.payload, null, 2)
            }, submittedStatus: course.locked ? 'checked' : ''
        });
    });
};

module.exports = {
    handle: handle
};
