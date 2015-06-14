var Boom = require('boom');
var Promise = require('bluebird');
var moment = require('moment');

var handle = function (req, reply) {
    var user = req.auth.credentials;
    var courseId = req.params.course_id;

    var models = req.server.plugins.models;

    var course;

    new models.course({
        isis_id: courseData.isis_id,
        visible: true
    }).fetch({withRelated: ['supervisors', 'students', 'groups']}).then(function (c) {
            if (c) {
                course = c;
                if (!course.related("students").get(user.id)) {
                    return course.students().attach(user);
                }
            } else {
                reply.view('404', {message: 'this course does not exist, or you do not have access to it.'});
                throw new Error('abort promise chain');
            }
        }).then(
        // On success
        function (u) {
            // Update and save the enrollment of this student:
            // TODO

            // Now the student is linked to the course
            reply.view('student_enrollment_form', {
                course: course.toJSON()
            });
        },
        // On error
        function (err) {
            if (err.message !== "abort promise chain") {
                reply.view('404');
            }
        });
};

module.exports = {
    handle: handle
};
