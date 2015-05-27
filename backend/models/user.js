module.exports = function(bookshelf) {
	var Model = bookshelf.Model.extend({
		tableName: 'users',

		// Get all courses for this user
		courses: function() {
			var Course = server.plugins.models.course;
			var UserCourse = server.plugins.models.usercourse;
			return this.belongsToMany(Course).through(UserCourse);
		},

		// Get all groups for this user
		groups: function() {
			var Group = server.plugins.models.group;
			var UserGroup = server.plugins.models.usergroup;
			return this.belongsToMany(Group).through(UserGroup);
		}
	});

	return Model;
};
