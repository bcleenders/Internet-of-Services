var checkit  = require('checkit');

module.exports = function(bookshelf) {
	var Model = bookshelf.Model.extend({
		tableName: 'groups',
		hasTimestamps: true,

		// Validation rules
		validations: {
		  name: 'required',
			waitingList: 'boolean'
		},

		// Overwrite initialize function to call validate method
		initialize: function() {
	    this.on('saving', this.validate.bind(this));
	  },

		// Validate function will check validation rules
		validate: function() {
	    return new checkit(this.validations).run(this.attributes);
	  },

		// Get all users in this group
		users: function() {
			var User = server.plugins.models.user;
			var GroupUser = server.plugins.models.groupuser;
			return this.belongsToMany(User).through(GroupUser);
		}
	});

	return Model;
};