server = {expose:function(models){this.plugins = {models: models}}}
var models = require('./../config/plugins/models')
exports.seed = function(knex, Promise) {
  models.register(server, {}, function(){})
  var users = [];
  var groups = [];
  var courses = [];
  var groupuser = [];
  var courseuser = [];
  var userId;
  var courseId;
  var groupId;

  for (var i = 1; i <= 10; i++) {
    users << new server.plugins.models.user({name: 'User ' + i}).save();
  }
  for (var i = 1; i <= 10; i++) {
    groups << new server.plugins.models.group({name: 'Group ' + i}).save();
  }
  for (var i = 1; i <= 10; i++) {
    courses << new server.plugins.models.course({name: 'Course ' + i}).save();
  }

  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),
    knex('groups').del(),
    knex('courses').del(),
    knex('group_user').del(),
    knex('course_user').del(),

    // Inserts seed entries
    users,

    new server.plugins.models.user().fetch().then(function(user) {
      console.log('***')
      userId = user.id;
      console.log("User id:" + userId)
    }),

    groups,

    new server.plugins.models.group().fetch().then(function(group) {
      groupId = group.id;

      return Promise.all([new server.plugins.models.groupuser({group_id: groupId, user_id: userId}).save(),
                          new server.plugins.models.groupuser({group_id: groupId + 1, user_id: userId + 1}).save(),
                          new server.plugins.models.groupuser({group_id: groupId + 2, user_id: userId + 2}).save(),
                          new server.plugins.models.groupuser({group_id: groupId + 3, user_id: userId + 3}).save(),
                          new server.plugins.models.groupuser({group_id: groupId + 4, user_id: userId + 4}).save(),
                          new server.plugins.models.groupuser({group_id: groupId + 5, user_id: userId + 5}).save(),
                          new server.plugins.models.groupuser({group_id: groupId + 6, user_id: userId + 6}).save(),
                          new server.plugins.models.groupuser({group_id: groupId + 7, user_id: userId + 7}).save(),
                          new server.plugins.models.groupuser({group_id: groupId + 8, user_id: userId + 8}).save(),
                          new server.plugins.models.groupuser({group_id: groupId + 9, user_id: userId + 9}).save()])
    }),

    courses,

    new server.plugins.models.course().fetch().then(function(course) {

      courseId = course.id;

      return Promise.all([new server.plugins.models.courseuser({course_id: courseId, user_id: userId}).save(),
                          new server.plugins.models.courseuser({course_id: courseId + 1, user_id: userId + 1}).save(),
                          new server.plugins.models.courseuser({course_id: courseId + 2, user_id: userId + 2}).save(),
                          new server.plugins.models.courseuser({course_id: courseId + 3, user_id: userId + 3}).save(),
                          new server.plugins.models.courseuser({course_id: courseId + 4, user_id: userId + 4}).save(),
                          new server.plugins.models.courseuser({course_id: courseId + 5, user_id: userId + 5}).save(),
                          new server.plugins.models.courseuser({course_id: courseId + 6, user_id: userId + 6}).save(),
                          new server.plugins.models.courseuser({course_id: courseId + 7, user_id: userId + 7}).save(),
                          new server.plugins.models.courseuser({course_id: courseId + 8, user_id: userId + 8}).save(),
                          new server.plugins.models.courseuser({course_id: courseId + 9, user_id: userId + 9}).save()])
    }),
    new server.plugins.models.user({id: 1}).fetch()



  );
};
