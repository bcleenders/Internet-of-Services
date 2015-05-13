module.exports = function(bookshelf) {
	var Model = bookshelf.Model.extend({
		tableName: 'users'
	})
	return Model;
};
