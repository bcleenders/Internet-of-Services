server = {expose:function(models){this.plugins = {models: models}}}
var models = require('./../config/plugins/models')
userId = null;
exports.seed = function(knex, Promise) {
  models.register(server, {}, function(){})
  var users = [];
  var groups = [];
  var courses = [];

  for (var i = 1; i <= 10; i++) {
    users << new server.plugins.models.user({name: 'User ' + i, email: "email" + i + "@example.com"}).save();
  }
  for (var i = 1; i <= 10; i++) {
    groups << new server.plugins.models.group({name: 'Group ' + i}).save();
  }
  for (var i = 1; i <= 10; i++) {
    courses << new server.plugins.models.course({name: 'Course ' + i, year: 2015, semester: 'winter '}).save();
  }

  return Promise.join(
    // Deletes ALL existing entries
    knex('group_user').del(),
    knex('course_user').del(),
    knex('users').del(),
    knex('groups').del(),
    knex('courses').del(),


    // Inserts seed entries
    users,
    groups,
    courses

  );
};
