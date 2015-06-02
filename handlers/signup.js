var Boom = require('boom');
var Promise = require('bluebird');
var _ = require('lodash');

var handle = function (req, reply) {
    // TODO: verify signature!

    var models = req.server.plugins.models;
    debugger
    var userData = {
        name: req.payload.lis_person_name_full,
        email: req.payload.lis_person_contact_email_primary
    };

    var course_userData = {
        teacher: (req.payload.roles === 'Instructor')
    };

    var courseData = {
        isis_id: req.payload.context_id,
        name: req.payload.context_title,
        year: 2000,
        semester: 'SS',
        userAttributes: userData,
        teacher: course_userData.teacher
    };

    if(req.payload.roles === 'Instructor'){
      models.course.findOrCreate({isis_id: courseData.isis_id}, courseData)
      .then(function(course){
        reply('Hello, world!');
      });
    }else{
      var user;
      models.user.findOrCreate({email: userData.email}, userData)
      .then(function(u){
        user = u;
        return new models.course({isis_id: courseData.isis_id}).fetch()
      })
      .then(function(course){
        if(course){
          return models.courseuser.findOrCreate({user_id: user.id, course_id: course.id}, {user_id: user.id, course_id: course.id, teacher: false})
        }else{
          return reply('The page was not found').code(404);
        }
      })
      .then(function(){
        reply('Hello, world!');
      })
    }
};

module.exports = {
    handle: handle
};
