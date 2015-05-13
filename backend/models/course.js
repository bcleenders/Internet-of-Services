module.exports = function(bookshelf) {
	var Model = bookshelf.Model.extend({
		tableName: 'courses'
	})
	return Model;
};
