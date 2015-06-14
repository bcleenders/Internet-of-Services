var checkit = require('checkit');
var Promise = require('bluebird');

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
        },

        // Get all groups for this course
        groups: function () {
            var Group = server.plugins.models.group;
            return this.hasMany(Group);
        },

        toJSON: function() {
            return {
                id: this.get('id'),
                name: this.get('name'),
                semester: this.get('semester'),
                description: this.get('description'),
                year: this.get('year'),
                preferences: this.get('preferences'),
                groups: this.related('groups').map(function(group) {
                    return group.attributes
                })
            };
        }
    });
    return Model;
};
