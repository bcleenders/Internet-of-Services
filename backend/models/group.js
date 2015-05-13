module.exports = function(bookshelf) {
	var Model = bookshelf.Model.extend({
		tableName: 'groups'
	})
	return Model;
};
