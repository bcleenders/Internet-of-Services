var Boom = require('boom');
var Promise = require('bluebird');
var moment = require('moment');

var handle = function (req, reply) {
    var user = req.auth.credentials;
    var course;
    var models = req.server.plugins.models;

    new models.user({id: user.id}).fetch({withRelated: ['supervisorCourses', "supervisorCourses.groups"]}).then(function (user) {
        var course = user.related("supervisorCourses").get(req.params.course_id);

        // Check that the user is allowed to edit this course:
        if (course) {
          var c = course.toJSON();
          if(c.groups.length === 0)
            c.groups = [{id: 0}]
          reply.view('course_properties_form', {
              course: c,
              debuginfo: {
                  payload: JSON.stringify(req.payload, null, 2)
              }, submittedStatus: course.locked ? 'checked' : ''
          });
        } else {
            reply.view('404', {message: 'we could not find a course with this ID where you are a supervisor.'}).code(404);
            // throw new Error('abort promise chain');
        }
    });
};

module.exports = {
    handle: handle
};
