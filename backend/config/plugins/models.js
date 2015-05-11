var config = require('config');
var waterline = require('waterline');

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : '127.0.0.1',
        user     : 'your_database_user',
        password : 'your_database_password',
        database : 'myapp_test',
        charset  : 'utf8'
    }
});

var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
    tableName: 'users'
});

exports.register = function (server, options, next) {

    var modelDefinitions = require('../../models');

    modelDefinitions.forEach(function(modelDef, name) {
        var modelName = name.toLowerCase();

        model = modelDef(bookshelf);
    });

    next();
};

exports.register.attributes = {
    name: 'IOSModels',
    version: '0.0.1'
};
