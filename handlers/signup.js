var Boom = require('boom');
var Promise = require('bluebird');
var _ = require('lodash');
var moment = require('moment');

var handle = function (req, reply) {
    // TODO: verify signature!

    var models = req.server.plugins.models;

    var userData = {
        name: req.payload.lis_person_name_full,
        email: req.payload.lis_person_contact_email_primary,
        isis_id: req.payload.user_id
    };

    var courseData = {
        isis_id: req.payload.context_id,
        name: req.payload.context_title,
        year: 2000,
        semester: 'SS'
    };

    // Declare this outside the "then(u){...}" scope, so we can still access it in the "then(course){...}" scope
    var user;
    var course;

    var isInstructor = req.payload.roles === 'Instructor';

    models.user.findOrCreate({email: userData.email}, userData)
        .then(function (u) {
            user = u;

            if (isInstructor) {
                return models.course.findOrCreate({isis_id: courseData.isis_id}, courseData, {withRelated: ['supervisors']});
            } else {
                return new models.course({isis_id: courseData.isis_id}).fetch({withRelated: ['students']});
            }
        })
        .then(function (c) {
            if (c) {
                course = c;
                if (isInstructor) {
                    if (!course.related("supervisors").get(user.id)) {
                        return course.supervisors().attach(user);
                    }
                } else {
                    if (!course.related("students").get(user.id)) {
                        return course.students().attach(user);
                    }
                }
            } else {
                reply(Boom.notFound('Resource not found contact your teacher'));
                throw new Error('abort promise chain');
            }

        }).then(function (c) {
            // At this point, both user and course are populated.
            if(isInstructor) {
                // Instructor workflow
                reply.view('course_properties_form', {
                    course: {
                        id: course.get('id'),
                        name: course.get('name'),
                        semester: course.get('semester'),
                        year: course.get('year')
                    }, supervisor: {
                        name: user.get('name')
                    }, debuginfo: {
                        payload: JSON.stringify(req.payload, null, 4)
                    }, submittedStatus: course.locked ? 'checked' : ''
                });
            } else {
                var enrollment_deadline = moment('2015-06-09');//moment(course.get('enrollment_deadline'));
                // Student workflow
                if(moment().isAfter(enrollment_deadline)) {
                    console.log('Before');
                    // Deadline is still in the future -> can't edit it anymore!
                    reply.view('student_group', {
                        group: {
                            name: 'fooo',
                            teammembers: [
                                {
                                    name: 'Juan'
                                }, {
                                    name: 'Marc'
                                }
                            ]
                        }
                    })
                } else {
                    console.log('after');
                    // Deadline has passed -> show groups!
                    reply.view('student_enrollment_form', {
                        course: {
                            id: course.get('id'),
                            name: course.get('name'),
                            semester: course.get('semester'),
                            year: course.get('year'),
                            enrollment_deadline: dateToString(enrollment_deadline)
                        }, student: {
                            name: user.get('name')
                        }, debuginfo: {
                            payload: JSON.stringify(req.payload, null, 4)
                        }
                    });
                }
            }
        }, function (err) {
            if (err.message !== "abort promise chain") {
                reply('Fuck, world!');
            }
        });
};

// Returns something like Jun 9th 2015, 12:00 am (in 7 hours)
var dateToString = function(date) {
    return date.format("MMM Do YYYY, h:mm a") + ' (' + date.fromNow() + ')';
};

module.exports = {
    handle: handle
};
