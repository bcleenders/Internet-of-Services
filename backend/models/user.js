module.exports = function(bookshelf) {
	bookshelf.Model.extend({
		tableName: 'users'
	})
};



name: Joi.string().required(),
	username: Joi.string().required(),
	email: Joi.string().required()