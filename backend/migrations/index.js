//var latest = function(knex) {
//    var migrations = require('require-dir')();
//
//    for(var key in migrations) {
//        var migration = migrations[key];
//        console.log("Running...");
//        migration.up(knex);
//    }
//};

var latest = function (knex, callback) {
    knex.schema.hasTable('users').then(function (exists) {
            if (!exists) {
                return createTable('users', function (table) {
                    table.increments('id').primary();
                    table.string('name');
                })
            }
        });

    knex.schema.hasTable('groups').then(function (exists) {
            if (!exists) {
                return knex.schema.createTable('groups', function (table) {
                    table.increments('id').primary();
                    table.string('name');
                })
            }
        });

    knex.schema.hasTable('courses').then(function (exists) {
            if (!exists) {
                return knex.schema.createTable('courses', function (table) {
                    table.increments('id').primary();
                    table.string('name');
                })
            }
        });

    knex.schema.hasTable('group_user').then(function (exists) {
            if (!exists) {
                return knex.schema.createTable('group_user', function (table) {
                    table.integer('group_id').references('id').inTable('groups');
                    table.integer('user_id').references('id').inTable('users');
                })
            }
        });
};

module.exports = {
    latest: latest
};
