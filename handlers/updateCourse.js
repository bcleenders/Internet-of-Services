var Boom = require('boom');
var Promise = require('bluebird');
var moment = require('moment');

var handle = function (req, reply) {
    var user = req.auth.credentials;
    var models = req.server.plugins.models;

    new models.user({id: user.id}).fetch({withRelated: ['supervisorCourses', "supervisorCourses.groups"]}).then(function(user) {
        var course = user.related("supervisorCourses").get(req.params.course_id);

        // Check that the user is allowed to edit this course:
        if(course) {
            var preferenceData;
            if(req.payload.preferences) {
                preferenceData = {
                    preferences: req.payload.preferences.preferences === 'on',
                    friends: req.payload.preferences.friends === 'on',
                    diverse: req.payload.preferences.diverse === 'on',
                    compulsory: req.payload.preferences.compulsory === 'on'
                };
            } else {
                preferenceData = {
                    preferences: false,
                    friends: false,
                    diverse: false
                }
            }

            if(req.payload.new_groups) {
                for(var i = 0; i < req.payload.new_groups.length; i++) {
                    var group = req.payload.new_groups[i];

                    console.log(group.name);
                    // Save this group
                    
                }
            }

            // So now we know the user is allowed to update the course:
            var courseData = {
                name: req.payload.name,
                year: JSON.parse(req.payload.year),
                semester: req.payload.semester,
                description: req.payload.description,
                preferences: preferenceData
            };

            return course.save(courseData, {patch: true});
        } else {
            reply.view('404', {message: 'we could not find a course with this ID where you are a supervisor.'}).code(404);
        }
    }).then(function(course) {
        // Course is updated
        debugger;
        reply.view('course_properties_form', {
            course: course.toJSON(),
            debuginfo: {
                payload: JSON.stringify(req.payload, null, 2)
            }, submittedStatus: course.locked ? 'checked' : ''
        });
    });
};

module.exports = {
    handle: handle
};
