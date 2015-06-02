var Boom = require('boom');
var Promise = require('bluebird');
var _ = require('lodash');

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
    var user;

    models.user.findOrCreate({email: userData.email}, userData)
    .then(function(u){
      user = u;
      var options = req.payload.roles === 'Instructor' ? {withRelated: ['supervisors']} : {withRelated: ['students']} ;
      if(req.payload.roles === 'Instructor'){
        return models.course.findOrCreate({isis_id: courseData.isis_id}, courseData, options);
      }else{
        return new models.course({isis_id: courseData.isis_id}).fetch(options);
      }
    })
    .then(function(course){
      if(course){
        if(req.payload.roles === 'Instructor'){
          if(!course.related("supervisors").get(user.id)){
            return course.supervisors().attach(user);
          }
        }else{
          if(!course.related("students").get(user.id)){
            return course.students().attach(user);
          }
        }
      }else{
        reply(Boom.notFound('Resource not found contact your teacher'));
        throw new Error('abort promise chain');
      }

    }).then(function(course){
      reply('Hello, world!');
    }, function(err){
      if(err.message !== "abort promise chain"){
        reply('Fuck, world!');
      }
    });
};

module.exports = {
    handle: handle
};
