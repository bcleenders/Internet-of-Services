'use strict';

exports.up = function(knex) {
    return knex.schema.createTable('group_user', function(table) {
        table.integer('group_id').unique().references('id');
        table.integer('user_id').unique().references('id');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('group_users');
};
