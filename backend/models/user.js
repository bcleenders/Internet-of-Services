module.exports = function(bookshelf) {
	var Model = bookshelf.Model.extend({
		tableName: 'users',
		hasTimestamps: true,

		// Get all courses for this user
		courses: function() {
			var Course = server.plugins.models.course;
			var CourseUser = server.plugins.models.courseuser;
			return this.belongsToMany(Course).through(CourseUser);
		},

		// Get all groups for this user
		groups: function() {
			var Group = server.plugins.models.group;
			var GroupUser = server.plugins.models.groupuser;
			return this.belongsToMany(Group).through(GroupUser);
		}
	});

	return Model;
};
