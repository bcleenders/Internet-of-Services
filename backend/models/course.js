var checkit  = require('checkit');

module.exports = function(bookshelf) {
	var Model = bookshelf.Model.extend({
		tableName: 'courses',
		hasTimestamps: true,

		// Validation rules
		validations: {
		  name: 'required',
			semester:'required',
			year:['required', 'numeric']
		},

		// Overwrite initialize function to call validate method
		initialize: function() {
	    this.on('saving', this.validate.bind(this));
	  },

		// Validate function will check validation rules
		validate: function() {
	    return new checkit(this.validations).run(this.attributes);
	  },

		// Get all users in this course
		users: function() {
			var User = server.plugins.models.user;
			var CourseUser = server.plugins.models.courseuser;
			return this.belongsToMany(User).through(CourseUser);
		}
	});

	return Model;
};
