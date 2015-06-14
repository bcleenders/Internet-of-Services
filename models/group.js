var checkit = require('checkit');

module.exports = function (bookshelf) {
    var Model = bookshelf.Model.extend({
        tableName: 'groups',
        hasTimestamps: true,

        // Validation rules
        validations: {
            name: 'required',
            waitingList: 'boolean'
        },

        // Overwrite initialize function to call validate method
        initialize: function () {
            this.on('saving', this.validate.bind(this));
        },

        // Validate function will check validation rules
        validate: function () {
            return new checkit(this.validations).run(this.attributes);
        },

        // Get all students in this group
        students: function () {
            var User = server.plugins.models.user;
            return this.belongsToMany(User);
        }
    });

    return Model;
};
