module.exports = function(bookshelf) {
	var Model = bookshelf.Model.extend({
		tableName: 'courses',

		// Get all users in this course
		users: function() {
			var User = server.plugins.models.user;
			var UserCourse = server.plugins.models.usercourse;
			return this.belongsToMany(User).through(UserCourse);
		}
	});
	return Model;
};
