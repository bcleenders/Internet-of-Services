module.exports = function(bookshelf) {
	var Model = bookshelf.Model.extend({
		tableName: 'groups',

		// Get all users in this group
		users: function() {
			var User = server.plugins.models.user;
			var UserGroup = server.plugins.models.usergroup;
			return this.belongsToMany(User).through(UserGroup);
		}
	});

	return Model;
};
