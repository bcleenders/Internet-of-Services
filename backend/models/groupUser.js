module.exports = function(bookshelf) {
	var Model = bookshelf.Model.extend({
		tableName: 'group_user',
		hasTimestamps: true,
		idAttribute: ['group_id', 'user_id']
	});

	return Model;
};
