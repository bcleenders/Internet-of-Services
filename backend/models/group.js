module.exports = function(bookshelf) {
	var Model = bookshelf.Model.extend({
		tableName: 'groups',
		hasTimestamps: true,

		// Get all users in this group
		users: function() {
			var User = server.plugins.models.user;
			var GroupUser = server.plugins.models.groupuser;
			return this.belongsToMany(User).through(GroupUser);
		}
	});

	return Model;
};
