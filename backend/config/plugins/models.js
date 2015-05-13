var config = require('config');

var knex = require('knex')({
  client: config.get("dbConfig.client"),
  connection: {
    database : config.get("dbConfig.database"),
    user     : config.get("dbConfig.user"),
    password : config.get("dbConfig.password")
  },
  pool: {
    min: config.get("dbConfig.poolMin"),
    max: config.get("dbConfig.poolMax")
  },
  migrations: {
    tableName: config.get("dbConfig.migrationsTableName")
  },
  debug: config.get("dbConfig.debug")
});

var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
    tableName: 'users'
});

exports.register = function (server, options, next) {

    var models = require('../../models');

    for(var name in models) {
        var model = models[name](bookshelf);
    }

    next();
};

exports.register.attributes = {
    name: 'IOSModels',
    version: '0.0.1'
};
