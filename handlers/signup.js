var Boom = require('boom');
var Promise = require('bluebird');
var _ = require('lodash');

var handle = function (req, reply) {
    // TODO: verify signature!

    console.log('Called...');

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
            if(!isInstructor) {
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
                // Student workflow
                reply.view('student_enrollment_form', {
                    course: {
                        id: course.get('id'),
                        name: course.get('name'),
                        semester: course.get('semester'),
                        year: course.get('year'),
                        enrollment_deadline: dateToString(new Date('7/1/2015'))
                    }, student: {
                        name: user.get('name')
                    }, debuginfo: {
                        payload: JSON.stringify(req.payload, null, 4)
                    }
                });
            }

        }, function (err) {
            if (err.message !== "abort promise chain") {
                reply('Fuck, world!');
            }
        });
};

var dateToString = function(date) {
    var weekdays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];
    var months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    var weekday = weekdays[date.getUTCDay()];
    var monthday = date.getDate();
    var month = months[date.getMonth()];

    return weekday + ' ' + monthday + ' ' + month;
};

module.exports = {
    handle: handle
};
