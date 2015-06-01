var checkit  = require('checkit');

module.exports = function(bookshelf) {
	var Model = bookshelf.Model.extend({
		tableName: 'users',
		hasTimestamps: true,

		// Validation rules
		validations: {
			name: 'required',
			email: ['required', 'email']
		},

		// Overwrite initialize function to call validate method
		initialize: function() {
			this.on('saving', this.validate.bind(this));
		},

		// Validate function will check validation rules
		validate: function() {
			return new checkit(this.validations).run(this.attributes);
		},

		// Get all courses for this user
		courses: function() {
			var Course = server.plugins.models.course;
			var CourseUser = server.plugins.models.courseuser;
			return this.belongsToMany(Course).through(CourseUser);
		},

		// Get all groups for this user
		groups: function() {
			var Group = server.plugins.models.group;
			var GroupUser = server.plugins.models.groupuser;
			return this.belongsToMany(Group).through(GroupUser);
		}
	});

	return Model;
};
