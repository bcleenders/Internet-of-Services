'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.createTable('group_user', function(table) {
        table.integer('group_id').inTable('group').references('id');
        table.integer('user_id').inTable('user').references('id');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('group_users');
};
