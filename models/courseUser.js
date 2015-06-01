module.exports = function(bookshelf) {
	var Model = bookshelf.Model.extend({
		tableName: 'course_user',
		hasTimestamps: true,
		idAttribute: ['course_id', 'user_id']
	});

	return Model;
};
