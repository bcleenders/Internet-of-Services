module.exports = function(bookshelf) {
	var Model = bookshelf.Model.extend({
		tableName: 'course_user',
		hasTimestamps: true,
	});

	return Model;
};
