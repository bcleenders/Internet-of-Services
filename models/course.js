var checkit = require('checkit');

module.exports = function (bookshelf) {
    var Model = bookshelf.Model.extend({
        tableName: 'courses',
        hasTimestamps: true,

        // Validation rules
        validations: {
            isis_id: ['required', 'numeric'],
            name: 'required',
            semester: 'required',
            year: ['required', 'numeric']
        },

				virtuals: {
			    userAttributes: {
			      get: function () {
			        return this._userAttributes;
			      },
			      set: function(value) {
			        this._userAttributes = value;
			      }
			    },
					teacher: {
			      get: function () {
			        return this._teacher;
			      },
			      set: function(value) {
			        this._teacher = value;
			      }
			    }
			  },

        // Overwrite initialize function to call validate method
        initialize: function () {
					this.on('saving', this.validate.bind(this));
        },

        // Validate function will check validation rules
        validate: function () {
            return new checkit(this.validations).run(this.attributes);
        },

        // Get all supervisors in this course
        supervisors: function () {
            var User = server.plugins.models.user;
            return this.belongsToMany(User, 'courses_supervisors');
        },

				// Get all students in this course
				students: function () {
            var User = server.plugins.models.user;
            return this.belongsToMany(User, 'courses_students');
        }
    });
    return Model;
};
