var config = require('config');

module.exports = {

  development: {
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
    debug: true
  },

  staging: {
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
    }
  },

  production:{
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
    }
  }

};
