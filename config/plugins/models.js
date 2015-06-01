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

exports.register = function (server, options, next) {

    // These are the files containing our model definitions
    var modelDefinitions = require('../../models');

    // These are the "instantiated" models -> use these for querying etc.
    var models = {
        _bookshelf: bookshelf
    };

    // Loop over all model definitions, initialize them with bookshelf and add them to the models object
    for(var name in modelDefinitions) {
        models[name.toLowerCase()] = modelDefinitions[name](bookshelf);
    }

    // Allow accessing the models through server.plugins.models.<modelname, i.e. 'user'>
    server.expose(models);

    next();
};

exports.register.attributes = {
    name: 'models',
    version: '0.0.1'
};
