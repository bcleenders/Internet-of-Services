module.exports = function(bookshelf) {
	var Model = bookshelf.Model.extend({
		tableName: 'courses',

		// Get all users in this course
		users: function() {
			var User = server.plugins.models.user;
			var CourseUser = server.plugins.models.courseuser;
			return this.belongsToMany(User).through(CourseUser);
		}
	});

	return Model;
};
