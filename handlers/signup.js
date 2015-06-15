var Boom = require('boom');
var Promise = require('bluebird');
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

            // Set the session info
            req.auth.session.set({
                id: user.get('id')
            });

            if (isInstructor) {
                return models.course.findOrCreate({isis_id: courseData.isis_id}, courseData, {withRelated: ['supervisors', 'groups', 'groups.students']});
            } else {
                return new models.course({isis_id: courseData.isis_id, visible: true}).fetch({withRelated: ['supervisors', 'students', 'groups', 'groups.students']});
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
                reply.view('404', {message: 'this course does not exist, or you do not have access to it.'});
                throw new Error('abort promise chain');
            }

        }).then(function (c) {
            // At this point, both user and course are populated.
            if(isInstructor) {
                // Instructor workflow
                reply.view('course_properties_form', {
                    course: course.toJSON(),
                    debuginfo: {
                        payload: JSON.stringify(req.payload, null, 4)
                    }
                });
            } else {
                var enrollment_deadline = moment(course.get('enrollment_deadline'));
                // Student workflow
                if(moment().isAfter(enrollment_deadline)) {
                    // Deadline has passed -> show results!
                    reply.view('student_group', {
                        groups: course.groups()
                    })
                } else {
                    var fakeCourse = course.toJSON();

                    fakeCourse.preferences = {
                        preferences: true,
                        friends: true,
                        diverse: true,
                        compulsory: true
                    };

                    fakeCourse.students = [];

                    fnames = ['Bram', 'Juan', 'Marc', 'Kees', 'Sjaak', 'Bernard'];
                    lnames = ['de Vries', 'Jansen', 'de Boer', 'Teunissen', 'van Rooij', 'van Wassenaar', 'de Keijzer'];
                    for(var i = 0; i < 40; i++) {
                        fakeCourse.students[i] = {
                            id: i,
                            name: fnames[i % fnames.length] + ' ' + lnames[i%lnames.length]
                        };
                    }

                    fakeCourse.groups = [
                        {
                            name: 'Test group 1',
                            description: 'foo descr',
                            minsize: 2,
                            maxsize: 10
                        },
                        {
                            name: 'Test group 2',
                            description: 'barrrrrr descr',
                            minsize: 20,
                            maxsize: 100
                        }
                    ];

                    // Deadline has not passed yet -> allow students to change their preferences.
                    reply.view('student_enrollment_form', {
                        course: fakeCourse,
                        enrollment_deadline: dateToString(enrollment_deadline),
                        debuginfo: {
                            payload: JSON.stringify(req.payload, null, 4)
                        }
                    });
                }
            }
        }, function (err) {
            if (err.message !== "abort promise chain") {
                reply.view('404');
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
