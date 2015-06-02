var checkit = require('checkit');

module.exports = function (bookshelf, serv) {
		var server = serv;
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
					this.on('created', this.afterCreate.bind(this));
					this.on('saving', this.validate.bind(this));
        },

        // Validate function will check validation rules
        validate: function () {
            return new checkit(this.validations).run(this.attributes);
        },

        // Get all users in this course
        users: function () {
            var User = server.plugins.models.user;
            var CourseUser = server.plugins.models.courseuser;
            return this.belongsToMany(User).through(CourseUser);
        },

				afterCreate: function (model, resp, options) {
					this.createUser(model, resp, options);
				},

				createUser: function (model, resp, options){
					server.plugins.models.user.findOrCreate({email: model.userAttributes.email}, model.userAttributes)
					.then(function(user){
						return server.plugins.models.courseuser.findOrCreate({user_id: user.id, course_id: model.id}, {user_id: user.id, course_id: model.id, teacher: model.teacher})
					})
				}
    });
    return Model;
};
