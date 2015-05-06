var HapiMongoModels = require('hapi-mongo-models');
var config = require('config');

exports.register = function (server, options, next) {

  var plugin = {
      register: HapiMongoModels,
      options: {
          mongodb: {
              url: "mongodb://" + config.get("dbConfig.host") + ":" + config.get("dbConfig.port") + "/" + config.get("dbConfig.dbName"),
              options: {}
          },
          autoIndex: false,
          models: {
              Quote: './models/quote'
          }
      }
  };

  server.register(plugin, function (err) {
      if (err) {
          console.log('Failed loading HapiMongoModels plugin: ' + err.toString());
      }
  });

};

exports.register.attributes = {
    name: 'IOSModels',
    version: '0.0.1'
};
