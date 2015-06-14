'use strict';

exports.up = function(knex) {
    return knex.schema.createTable('groups_users', function(table) {
        table.integer('group_id').notNullable().references('groups.id');
        table.integer('user_id').notNullable().references('users.id');
        table.unique(['group_id', 'user_id']);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('group_users');
};
