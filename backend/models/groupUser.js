module.exports = function(bookshelf) {
	var Model = bookshelf.Model.extend({
		tableName: 'group_user',
		hasTimestamps: true,
	});

	return Model;
};
